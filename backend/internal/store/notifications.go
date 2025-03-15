package store

import "time"

type Notification struct {
	CardId    int64     `json:"card_id"`
	UserId    int64     `json:"user_id"`
	Read      bool      `json:"read"`
	CreatedAt time.Time `json:"created_at"` // user's account creation date
}
