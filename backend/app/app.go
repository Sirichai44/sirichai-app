package app

import (
	"context"
	"fmt"
	"log/slog"

	"myapp/apis"
	"myapp/config"
	"myapp/drivers"

	"github.com/gofiber/fiber/v3"
	"golang.org/x/sync/errgroup"
)

type Apps interface {
	Runner(context.Context) error
}

type app struct {
	config *config.AppConfig
	fiber  *fiber.App
	mgc    *drivers.MongoDBClient
}

func NewApp(conf *config.AppConfig) (Apps, error) {
	mgc, err := drivers.MongoDBConn(conf.Database)
	if err != nil {
		return nil, err
	}
	slog.Info("MongoDB", slog.String("entry", conf.Database.Host+":"+fmt.Sprintf("%d", conf.Database.Port)), slog.String("connect", "successfully"))
	
	fb := apis.NewFiberAPI()

	return &app{
		config: conf,
		fiber:  fb,
		mgc:    mgc,
	}, nil
}

func (a *app) Runner(ctx context.Context) error {
	g, c := errgroup.WithContext(ctx)

	g.Go(func() error {
		return a.fiber.Listen(a.config.Server.Port)
	})

	g.Go(func() error {
		<-c.Done()

		return a.fiber.ShutdownWithContext(c)
	})
	return g.Wait()
}
