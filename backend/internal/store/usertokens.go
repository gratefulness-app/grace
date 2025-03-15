package store

type UserToken struct {
	ID     int64  `json:"id"`
	Token  []byte `json:"token"`
	UserId int64  `json:"user_id"`
}
