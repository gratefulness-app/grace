package store

import (
	"context"
	"database/sql"
	"errors"
	"time"

	_ "github.com/lib/pq"
)

var (
	ErrNotFound          = errors.New("resource not found")
	ErrPartnerNotFound   = errors.New("partner not found")
	QueryTimeoutDuration = time.Second * 5
)

type Storage struct {
	Users interface {
		Create(context.Context, *sql.Tx, *User) error
		CreateAndInvite(context.Context, *User, string, time.Duration) error
		GetByID(context.Context, int64) (*User, error)
		Update(context.Context, *User) error
		Delete(context.Context, int64) error
	}
	UserTokens interface {
		Create(context.Context, *sql.Tx, *UserToken) error
		GetByToken(context.Context, string) (*UserToken, error)
		GetByUserID(context.Context, int64) ([]*UserToken, error)
		Delete(context.Context, int64) error
		DeleteByUserID(context.Context, int64) error
	}
	Templates interface {
		GetByID(context.Context, int64) (*Template, error)
		Create(context.Context, *sql.Tx, *Template) error
		Update(context.Context, *Template) error
		List(context.Context, int, int) ([]*Template, error)
	}
	Cards interface {
		GetByID(context.Context, int64) (*Card, error)
		Create(context.Context, *sql.Tx, *Card) error
		GetByUserID(context.Context, int64, int, int) ([]*Card, error)
		Delete(context.Context, int64) error
	}
	Friends interface {
		Create(context.Context, *sql.Tx, *Friend) error
		GetByID(context.Context, int64, int64) (*Friend, error)
		GetByUserID(context.Context, int64, int, int) ([]*User, error)
		Delete(context.Context, int64, int64) error
		IsFriend(context.Context, int64, int64) (bool, error)
	}
	Followers interface {
		Create(context.Context, *sql.Tx, *Follower) error
		GetByID(context.Context, int64, int64) (*Follower, error)
		GetFollowers(context.Context, int64, int, int) ([]*User, error)
		GetFollowing(context.Context, int64, int, int) ([]*User, error)
		Delete(context.Context, int64, int64) error
		IsFollowing(context.Context, int64, int64) (bool, error)
		Unfollow(context.Context, int64, int64) error
	}
	Notifications interface {
		Create(context.Context, *sql.Tx, *Notification) error
		GetByID(context.Context, int64, int64) (*Notification, error)
		GetByUserID(context.Context, int64, int, int) ([]*Notification, error)
		Update(context.Context, *Notification) error
		Delete(context.Context, int64, int64) error
		GetUnreadByUserID(context.Context, int64, int, int) ([]*Notification, error)
		MarkAsRead(context.Context, int64, int64) error
	}
	Badges interface {
		GetByID(context.Context, int64) (*Badge, error)
		Create(context.Context, *sql.Tx, *Badge) error
		ListAll(context.Context) ([]*Badge, error)
	}
	UserBadges interface {
		Create(context.Context, *sql.Tx, *UserBadge) error
		GetByID(context.Context, int64, int64) (*UserBadge, error)
		GetByUserID(context.Context, int64) ([]*Badge, error)
		Delete(context.Context, int64, int64) error
	}
}

func NewStorage(db *sql.DB) Storage {
	return Storage{
		Users:         &UserStore{db},
		UserTokens:    &UserTokenStore{db},
		Templates:     &TemplateStore{db},
		Cards:         &CardStore{db},
		Friends:       &FriendStore{db},
		Followers:     &FollowerStore{db},
		Notifications: &NotificationStore{db},
		Badges:        &BadgeStore{db},
		UserBadges:    &UserBadgeStore{db},
	}
}

func withTx(db *sql.DB, ctx context.Context, fn func(*sql.Tx) error) error {
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	if err := fn(tx); err != nil {
		_ = tx.Rollback()
		return err
	}

	return tx.Commit()
}
