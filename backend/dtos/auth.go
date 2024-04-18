package dtos

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DtoRegister struct {
	Username        string `json:"username" validate:"required"`
	Email           string `json:"email" validate:"required,email"`
	Password        string `json:"password" validate:"required"`
	ConfirmPassword string `json:"confirm_password" validate:"required,eqfield=Password"`
}


type Register struct {
	ID        primitive.ObjectID `bson:"_id"`
	Username  string             `bson:"username"`
	Email     string             `bson:"email"`
	Password  string             `bson:"password"`
	CreatedAt time.Time          `bson:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at"`
}
