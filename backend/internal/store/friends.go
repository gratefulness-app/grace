package store

type Friend struct {
	UserId   int64 `json:"user_id"`   // user that is befriending
	FriendId int64 `json:"friend_id"` // user that is being befriended
}
