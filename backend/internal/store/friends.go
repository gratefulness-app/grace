package store

import (
	"context"
	"database/sql"
)

type Friend struct {
	UserId   int64 `json:"user_id"`   // user that is befriending
	FriendId int64 `json:"friend_id"` // user that is being befriended
}

type FriendStore struct {
	db *sql.DB
}

// Create adds a new friend relationship
func (s *FriendStore) Create(ctx context.Context, tx *sql.Tx, friend *Friend) error {
	query := `
		INSERT INTO friends (user_id, friend_id)
		VALUES ($1, $2)
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := tx.ExecContext(ctx, query, friend.UserId, friend.FriendId)
	if err != nil {
		return err
	}

	return nil
}

// GetByID retrieves a friend relationship
func (s *FriendStore) GetByID(ctx context.Context, userId, friendId int64) (*Friend, error) {
	query := `
		SELECT user_id, friend_id
		FROM friends
		WHERE user_id = $1 AND friend_id = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var friend Friend
	err := s.db.QueryRowContext(ctx, query, userId, friendId).Scan(
		&friend.UserId,
		&friend.FriendId,
	)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return &friend, nil
}

// GetByUserID retrieves all friends for a user
func (s *FriendStore) GetByUserID(ctx context.Context, userId int64, limit, offset int) ([]*User, error) {
	query := `
		SELECT u.id, u.username, u.email, u.verified, u.friend_hash, u.follower_hash, u.updated_at, u.created_at
		FROM users u
		INNER JOIN friends f ON f.friend_id = u.id
		WHERE f.user_id = $1
		ORDER BY u.username
		LIMIT $2 OFFSET $3
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, userId, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	friends := []*User{}

	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.Verified,
			&user.FriendHash,
			&user.FollowerHash,
			&user.UpdatedAt,
			&user.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		friends = append(friends, &user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return friends, nil
}

// Delete removes a friend relationship
func (s *FriendStore) Delete(ctx context.Context, userId, friendId int64) error {
	query := `
		DELETE FROM friends
		WHERE user_id = $1 AND friend_id = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	result, err := s.db.ExecContext(ctx, query, userId, friendId)
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

// IsFriend checks if a friendship exists (convenience method)
func (s *FriendStore) IsFriend(ctx context.Context, userId, friendId int64) (bool, error) {
	_, err := s.GetByID(ctx, userId, friendId)
	if err != nil {
		if err == ErrNotFound {
			return false, nil
		}
		return false, err
	}
	return true, nil
}
