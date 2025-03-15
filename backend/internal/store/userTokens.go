package store

import (
	"context"
	"database/sql"
)

// UserToken represents a user authentication token in the system
type UserToken struct {
	ID     int64  `json:"id"`
	Token  string `json:"token"`
	UserID int64  `json:"user_id"`
}

// UserTokenStore provides access to user token storage
type UserTokenStore struct {
	db *sql.DB
}

// Create adds a new user token to the database within a transaction
func (s *UserTokenStore) Create(ctx context.Context, tx *sql.Tx, token *UserToken) error {
	query := `
		INSERT INTO user_tokens (token, user_id)
		VALUES ($1, $2)
		RETURNING id
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := tx.QueryRowContext(
		ctx,
		query,
		token.Token,
		token.UserID,
	).Scan(&token.ID)

	if err != nil {
		return err
	}

	return nil
}

// GetByToken retrieves a user token by its token string
func (s *UserTokenStore) GetByToken(ctx context.Context, token string) (*UserToken, error) {
	query := `
		SELECT id, token, user_id
		FROM user_tokens
		WHERE token = $1
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var userToken UserToken
	err := s.db.QueryRowContext(ctx, query, token).Scan(
		&userToken.ID,
		&userToken.Token,
		&userToken.UserID,
	)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return &userToken, nil
}

// GetByUserID retrieves a user's tokens by user ID
func (s *UserTokenStore) GetByUserID(ctx context.Context, userID int64) ([]*UserToken, error) {
	query := `
		SELECT id, token, user_id
		FROM user_tokens
		WHERE user_id = $1
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	tokens := []*UserToken{}

	for rows.Next() {
		var token UserToken
		err := rows.Scan(
			&token.ID,
			&token.Token,
			&token.UserID,
		)
		if err != nil {
			return nil, err
		}
		tokens = append(tokens, &token)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return tokens, nil
}

// Delete removes a user token by its ID
func (s *UserTokenStore) Delete(ctx context.Context, id int64) error {
	query := `
		DELETE FROM user_tokens
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

// DeleteByUserID removes all tokens for a specific user
func (s *UserTokenStore) DeleteByUserID(ctx context.Context, userID int64) error {
	query := `
		DELETE FROM user_tokens
		WHERE user_id = $1
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := s.db.ExecContext(ctx, query, userID)
	if err != nil {
		return err
	}

	return nil
}
