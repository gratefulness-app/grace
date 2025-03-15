package store

import (
	"context"
	"database/sql"
	"time"
)

type Card struct {
	ID         int64     `json:"id"`
	Title      string    `json:"title"`
	Data       any       `json:"data"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	TemplateId int64     `json:"template_id"`
	UserId     int64     `json:"user_id"`
}

type CardStore struct {
	db *sql.DB
}

func (s *CardStore) GetByID(ctx context.Context, id int64) (*Card, error) {
	query := `
		SELECT id, title, data, created_at, updated_at, template_id, user_id
		FROM cards
		WHERE id = $1
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var card Card
	err := s.db.QueryRowContext(ctx, query, id).Scan(
		&card.ID,
		&card.Title,
		&card.Data,
		&card.CreatedAt,
		&card.UpdatedAt,
		&card.TemplateId,
		&card.UserId,
	)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return &card, nil
}

func (s *CardStore) Create(ctx context.Context, tx *sql.Tx, card *Card) error {
	query := `
		INSERT INTO cards (title, data, template_id, user_id)
		VALUES ($1, $2, $3, $4)
		RETURNING id, created_at, updated_at
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := tx.QueryRowContext(
		ctx,
		query,
		card.Title,
		card.Data,
		card.TemplateId,
		card.UserId,
	).Scan(
		&card.ID,
		&card.CreatedAt,
		&card.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}

func (s *CardStore) GetByUserID(ctx context.Context, userID int64, limit, offset int) ([]*Card, error) {
	query := `
		SELECT id, title, data, created_at, updated_at, template_id, user_id
		FROM cards
		WHERE user_id = $1
		ORDER BY created_at DESC
		LIMIT $2 OFFSET $3
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, userID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	cards := []*Card{}

	for rows.Next() {
		var card Card
		err := rows.Scan(
			&card.ID,
			&card.Title,
			&card.Data,
			&card.CreatedAt,
			&card.UpdatedAt,
			&card.TemplateId,
			&card.UserId,
		)
		if err != nil {
			return nil, err
		}
		cards = append(cards, &card)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return cards, nil
}

func (s *CardStore) Delete(ctx context.Context, id int64) error {
	query := `
		DELETE FROM cards
		WHERE id = $1
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	result, err := s.db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrNotFound
	}

	return nil
}
