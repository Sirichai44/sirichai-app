package services

import (
	"context"
	"myapp/dtos"

	"go.mongodb.org/mongo-driver/mongo"
)

type AuthService interface {
	Create(ctx context.Context, dto dtos.DtoRegister) error
}

type authService struct {
	mgc *mongo.Collection
}

func NewAuthService(mgc *mongo.Collection) AuthService {
	return &authService{mgc: mgc}
}

func (auth *authService) Create(ctx context.Context, dto dtos.DtoRegister) error {

	
	return nil
}