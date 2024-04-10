package services

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

type Service[T any] interface {
	FindAll(ctx context.Context) ([]T, error)
}

type mgo[T any] struct {
	mc *mongo.Collection
}

func NewService[T any](mc *mongo.Collection) Service[T] {
	return &mgo[T]{mc: mc}
}

func (m *mgo[T]) FindAll(ctx context.Context) ([]T, error) {
	return nil, nil
}