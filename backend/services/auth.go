package services

import (
	"context"
	"log/slog"

	"myapp/dtos"

	"go.mongodb.org/mongo-driver/mongo"
)

type AuthService interface {
	Service[dtos.Register]
	Create(ctx context.Context, dto dtos.Register) error
}

type authService struct {
	Service[dtos.Register]
	mgc *mongo.Collection
}

func NewAuthService(mgc *mongo.Collection) AuthService {
	return &authService{mgc: mgc, Service: NewService[dtos.Register](mgc)}
}

func (auth *authService) Create(ctx context.Context, dto dtos.Register) error {
	_, err := auth.mgc.InsertOne(ctx, dto)
	if err != nil {
		slog.Error("AuthService", slog.String("entry", "Create"), slog.String("insert", "failed"))
		return err
	}

	return err
}
