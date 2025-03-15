package store

type Follower struct {
	UserId     int64 `json:"user_id"`     // user that is being followed
	FollowerId int64 `json:"follower_id"` // user that is following
}
