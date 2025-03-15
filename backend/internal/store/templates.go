package store

import (
	"context"
	"database/sql"
	"time"
)

type Template struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Data        any       `json:"data"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type TemplateStore struct {
	db *sql.DB
}

func (s *TemplateStore) GetByID(ctx context.Context, id int64) (*Template, error) {
	query := `
		SELECT id, title, description, data, created_at, updated_at
		FROM templates
		WHERE id = $1
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var template Template
	err := s.db.QueryRowContext(ctx, query, id).Scan(
		&template.ID,
		&template.Title,
		&template.Description,
		&template.Data,
		&template.CreatedAt,
		&template.UpdatedAt,
	)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return &template, nil
}

func (s *TemplateStore) Create(ctx context.Context, tx *sql.Tx, template *Template) error {
	query := `
		INSERT INTO templates (title, description, data)
		VALUES ($1, $2, $3)
		RETURNING id, created_at, updated_at
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := tx.QueryRowContext(
		ctx,
		query,
		template.Title,
		template.Description,
		template.Data,
	).Scan(
		&template.ID,
		&template.CreatedAt,
		&template.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}

func (s *TemplateStore) Update(ctx context.Context, template *Template) error {
	query := `
		UPDATE templates
		SET title = $1, description = $2, data = $3, updated_at = NOW()
		WHERE id = $4 AND updated_at = $5
		RETURNING updated_at
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := s.db.QueryRowContext(
		ctx,
		query,
		template.Title,
		template.Description,
		template.Data,
		template.ID,
		template.UpdatedAt,
	).Scan(&template.UpdatedAt)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return ErrNotFound
		default:
			return err
		}
	}

	return nil
}

func (s *TemplateStore) List(ctx context.Context, limit, offset int) ([]*Template, error) {
	query := `
		SELECT id, title, description, data, created_at, updated_at
		FROM templates
		ORDER BY id
		LIMIT $1 OFFSET $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	templates := []*Template{}

	for rows.Next() {
		var template Template
		err := rows.Scan(
			&template.ID,
			&template.Title,
			&template.Description,
			&template.Data,
			&template.CreatedAt,
			&template.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		templates = append(templates, &template)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return templates, nil
}
