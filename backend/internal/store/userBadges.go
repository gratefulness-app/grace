package store

import "time"

type UserBadge struct {
	UserId    int64     `json:"user_id"`
	BadgeId   int64     `json:"badge_id"`
	CreatedAt time.Time `json:"created_at"`
}
