package main

import (
	"context"
	"log/slog"

	"myapp/app"
	"myapp/config"
)

func main() {
	ctx := context.Background()
	conf := config.NewAppConfig()

	app, err := app.NewApp(conf)
	if err != nil {
		slog.Error(err.Error())
		panic(err)
	}

	app.Runner(ctx)
}
