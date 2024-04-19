package drivers

import (
	"context"
	"fmt"
	"time"

	"myapp/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDBClient struct {
	*mongo.Client
	*mongo.Database
}

func MongoDBConn(opt config.Database, mode string) (*MongoDBClient, error) {
	var dsn string
	if mode == "dev" {
		dsn = fmt.Sprintf("mongodb://%s:%d", opt.Host, opt.Port)
	} else {
		dsn = opt.Url
	}
	
	opts := options.Client()
	opts.ApplyURI(dsn)

	// Set auth dev mode
	if mode == "dev" && opt.Username != "" && opt.Password != "" {
		opts.SetAuth(options.Credential{
			Username: opt.Username,
			Password: opt.Password,
		})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return nil, err
	}
	fmt.Println("client--->", "connected")
	if err := client.Ping(ctx, nil); err != nil {
		return nil, err
	}
	fmt.Println("client--->", "ping")
	return &MongoDBClient{Client: client, Database: client.Database(opt.Databasename)}, nil
}
