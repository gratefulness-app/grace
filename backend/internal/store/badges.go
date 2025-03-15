package store

import (
	"context"
	"database/sql"
)

type Badge struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

type BadgeStore struct {
	db *sql.DB
}

func (s *BadgeStore) GetByID(ctx context.Context, id int64) (*Badge, error) {
	query := `
		SELECT id, title, description, icon
		FROM badges
		WHERE id = $1
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var badge Badge
	err := s.db.QueryRowContext(ctx, query, id).Scan(
		&badge.ID,
		&badge.Title,
		&badge.Description,
		&badge.Icon,
	)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return &badge, nil
}

func (s *BadgeStore) Create(ctx context.Context, tx *sql.Tx, badge *Badge) error {
	query := `
		INSERT INTO badges (title, description, icon)
		VALUES ($1, $2, $3)
		RETURNING id
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := tx.QueryRowContext(
		ctx,
		query,
		badge.Title,
		badge.Description,
		badge.Icon,
	).Scan(&badge.ID)

	if err != nil {
		return err
	}

	return nil
}

func (s *BadgeStore) ListAll(ctx context.Context) ([]*Badge, error) {
	query := `
		SELECT id, title, description, icon
		FROM badges
		ORDER BY title
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	badges := []*Badge{}

	for rows.Next() {
		var badge Badge
		err := rows.Scan(
			&badge.ID,
			&badge.Title,
			&badge.Description,
			&badge.Icon,
		)
		if err != nil {
			return nil, err
		}
		badges = append(badges, &badge)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return badges, nil
}
