package store

import (
	"context"
	"database/sql"
	"time"
)

type Notification struct {
	CardId    int64     `json:"card_id"`
	UserId    int64     `json:"user_id"`
	Read      bool      `json:"read"`
	CreatedAt time.Time `json:"created_at"`
}

type NotificationStore struct {
	db *sql.DB
}

// Create adds a new notification
func (s *NotificationStore) Create(ctx context.Context, tx *sql.Tx, notification *Notification) error {
	query := `
		INSERT INTO notifications (card_id, user_id, read)
		VALUES ($1, $2, $3)
		RETURNING created_at
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := tx.QueryRowContext(
		ctx,
		query,
		notification.CardId,
		notification.UserId,
		notification.Read,
	).Scan(&notification.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}

// GetByID retrieves a notification by its card ID and user ID
func (s *NotificationStore) GetByID(ctx context.Context, cardId, userId int64) (*Notification, error) {
	query := `
		SELECT card_id, user_id, read, created_at
		FROM notifications
		WHERE card_id = $1 AND user_id = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var notification Notification
	err := s.db.QueryRowContext(ctx, query, cardId, userId).Scan(
		&notification.CardId,
		&notification.UserId,
		&notification.Read,
		&notification.CreatedAt,
	)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return &notification, nil
}

// GetByUserID retrieves all notifications for a user
func (s *NotificationStore) GetByUserID(ctx context.Context, userId int64, limit, offset int) ([]*Notification, error) {
	query := `
		SELECT card_id, user_id, read, created_at
		FROM notifications
		WHERE user_id = $1
		ORDER BY created_at DESC
		LIMIT $2 OFFSET $3
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, userId, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	notifications := []*Notification{}

	for rows.Next() {
		var notification Notification
		err := rows.Scan(
			&notification.CardId,
			&notification.UserId,
			&notification.Read,
			&notification.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		notifications = append(notifications, &notification)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return notifications, nil
}

// Update updates a notification's read status
func (s *NotificationStore) Update(ctx context.Context, notification *Notification) error {
	query := `
		UPDATE notifications
		SET read = $1
		WHERE card_id = $2 AND user_id = $3
		RETURNING created_at
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := s.db.QueryRowContext(
		ctx,
		query,
		notification.Read,
		notification.CardId,
		notification.UserId,
	).Scan(&notification.CreatedAt)

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

// Delete removes a notification
func (s *NotificationStore) Delete(ctx context.Context, cardId, userId int64) error {
	query := `
		DELETE FROM notifications
		WHERE card_id = $1 AND user_id = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	result, err := s.db.ExecContext(ctx, query, cardId, userId)
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

// GetUnreadByUserID retrieves all unread notifications for a user (convenience method)
func (s *NotificationStore) GetUnreadByUserID(ctx context.Context, userId int64, limit, offset int) ([]*Notification, error) {
	query := `
		SELECT card_id, user_id, read, created_at
		FROM notifications
		WHERE user_id = $1 AND read = FALSE
		ORDER BY created_at DESC
		LIMIT $2 OFFSET $3
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, userId, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	notifications := []*Notification{}

	for rows.Next() {
		var notification Notification
		err := rows.Scan(
			&notification.CardId,
			&notification.UserId,
			&notification.Read,
			&notification.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		notifications = append(notifications, &notification)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return notifications, nil
}

// MarkAsRead marks a notification as read (convenience method)
func (s *NotificationStore) MarkAsRead(ctx context.Context, cardId, userId int64) error {
	notification := &Notification{
		CardId: cardId,
		UserId: userId,
		Read:   true,
	}

	return s.Update(ctx, notification)
}
