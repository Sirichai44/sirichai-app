package services

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Service[T any] interface {
	FindAll(ctx context.Context) ([]T, error)
	FindOneKeyValue(ctx context.Context, key string, value any, opts ...primitive.E) (*T, error)
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

func (m *mgo[T]) FindOneKeyValue(ctx context.Context, key string, value any, opts ...primitive.E) (*T, error) {
	filter := primitive.D{primitive.E{Key: key, Value: value}}
	filter = append(filter, opts...)

	var t T
	if err := m.mc.FindOne(ctx, filter, options.FindOne().SetSort(bson.M{"created_at": -1})).Decode(&t); err != nil {
		return nil, err
	}

	return &t, nil
}
