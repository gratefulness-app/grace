package store

import "time"

type Card struct {
	ID         int64     `json:"id"`
	Title      string    `json:"title"`
	Data       any       `json:"data"`
	CreatedAt  time.Time `json:"created_at"`
	TemplateId int64     `json:"template_id"`
	UsedId     int64     `json:"used_id"`
}
