package store

type Template struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Data        any    `json:"data"`
}
