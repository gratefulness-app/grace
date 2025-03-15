package store

import (
	"context"
	"database/sql"
)

type Follower struct {
	UserId     int64 `json:"user_id"`     // user that is being followed
	FollowerId int64 `json:"follower_id"` // user that is following
}

type FollowerStore struct {
	db *sql.DB
}

// Create adds a new follower relationship
func (s *FollowerStore) Create(ctx context.Context, tx *sql.Tx, follower *Follower) error {
	query := `
		INSERT INTO followers (user_id, follower_id)
		VALUES ($1, $2)
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := tx.ExecContext(ctx, query, follower.UserId, follower.FollowerId)
	if err != nil {
		return err
	}

	return nil
}

// GetByID retrieves a follower relationship by its composite ID
func (s *FollowerStore) GetByID(ctx context.Context, userId, followerId int64) (*Follower, error) {
	query := `
		SELECT user_id, follower_id
		FROM followers
		WHERE user_id = $1 AND follower_id = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var follower Follower
	err := s.db.QueryRowContext(ctx, query, userId, followerId).Scan(
		&follower.UserId,
		&follower.FollowerId,
	)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return &follower, nil
}

// GetFollowers retrieves all users who follow a specific user
func (s *FollowerStore) GetFollowers(ctx context.Context, userId int64, limit, offset int) ([]*User, error) {
	query := `
		SELECT u.id, u.username, u.email, u.verified, u.friend_hash, u.follower_hash, u.updated_at, u.created_at
		FROM users u
		INNER JOIN followers f ON f.follower_id = u.id
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

	followers := []*User{}

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
		followers = append(followers, &user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return followers, nil
}

// GetFollowing retrieves all users that a specific user follows
func (s *FollowerStore) GetFollowing(ctx context.Context, followerId int64, limit, offset int) ([]*User, error) {
	query := `
		SELECT u.id, u.username, u.email, u.verified, u.friend_hash, u.follower_hash, u.updated_at, u.created_at
		FROM users u
		INNER JOIN followers f ON f.user_id = u.id
		WHERE f.follower_id = $1
		ORDER BY u.username
		LIMIT $2 OFFSET $3
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, followerId, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	following := []*User{}

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
		following = append(following, &user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return following, nil
}

// Delete removes a follower relationship (unfollows)
func (s *FollowerStore) Delete(ctx context.Context, userId, followerId int64) error {
	query := `
		DELETE FROM followers
		WHERE user_id = $1 AND follower_id = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	result, err := s.db.ExecContext(ctx, query, userId, followerId)
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

// IsFollowing checks if a follow relationship exists (convenience method)
func (s *FollowerStore) IsFollowing(ctx context.Context, userId, followerId int64) (bool, error) {
	_, err := s.GetByID(ctx, userId, followerId)
	if err != nil {
		if err == ErrNotFound {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

// Unfollow is an alias for Delete (convenience method)
func (s *FollowerStore) Unfollow(ctx context.Context, userId, followerId int64) error {
	return s.Delete(ctx, userId, followerId)
}
