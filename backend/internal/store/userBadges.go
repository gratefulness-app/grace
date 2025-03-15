package store

import (
	"context"
	"database/sql"
	"time"
)

type UserBadge struct {
	UserId    int64     `json:"user_id"`
	BadgeId   int64     `json:"badge_id"`
	CreatedAt time.Time `json:"created_at"`
}

type UserBadgeStore struct {
	db *sql.DB
}

// Create adds a new badge to a user
func (s *UserBadgeStore) Create(ctx context.Context, tx *sql.Tx, userBadge *UserBadge) error {
	query := `
		INSERT INTO user_badges (user_id, badge_id)
		VALUES ($1, $2)
		RETURNING created_at
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := tx.QueryRowContext(
		ctx,
		query,
		userBadge.UserId,
		userBadge.BadgeId,
	).Scan(&userBadge.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}

// GetByID checks if a user has a specific badge
func (s *UserBadgeStore) GetByID(ctx context.Context, userID, badgeID int64) (*UserBadge, error) {
	query := `
		SELECT user_id, badge_id, created_at
		FROM user_badges
		WHERE user_id = $1 AND badge_id = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var userBadge UserBadge
	err := s.db.QueryRowContext(ctx, query, userID, badgeID).Scan(
		&userBadge.UserId,
		&userBadge.BadgeId,
		&userBadge.CreatedAt,
	)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return &userBadge, nil
}

// GetByUserID retrieves all badges for a user
func (s *UserBadgeStore) GetByUserID(ctx context.Context, userId int64) ([]*Badge, error) {
	query := `
		SELECT b.id, b.title, b.description, b.icon
		FROM badges b
		INNER JOIN user_badges ub ON ub.badge_id = b.id
		WHERE ub.user_id = $1
		ORDER BY ub.created_at DESC
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, userId)
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

// Delete removes a badge from a user
func (s *UserBadgeStore) Delete(ctx context.Context, userId, badgeId int64) error {
	query := `
		DELETE FROM user_badges
		WHERE user_id = $1 AND badge_id = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	result, err := s.db.ExecContext(ctx, query, userId, badgeId)
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
