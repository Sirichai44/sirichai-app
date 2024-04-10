package app

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	"myapp/apis"
	"myapp/config"
	"myapp/drivers"

	"github.com/gofiber/fiber/v3"
	"github.com/spf13/cobra"
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

func NewAppRoot() *cobra.Command {
	var fileP string
	rootCmd := &cobra.Command{
		Use:     "app",
		Short:   "Sirichai's App",
		Version: "v1.0.0",
		RunE: func(cmd *cobra.Command, args []string) error {
			conf, err := config.NewAppConfig(fileP)
			if err != nil {
				return err
			}

			app, err := NewApp(conf)
			if err != nil {
				return err
			}

			ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
			defer cancel()
			app.Runner(ctx)

			sig := make(chan os.Signal, 1)
			signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

			<-sig

			slog.Info("Received signal to shutdown")

			return nil
		},
	}

	rootCmd.PersistentFlags().StringVarP(&fileP, "config", "c", "", "config file path")

	return rootCmd
}

func NewApp(conf *config.AppConfig) (Apps, error) {
	mgc, err := drivers.MongoDBConn(conf.Database)
	if err != nil {
		return nil, err
	}
	slog.Info("MongoDB", slog.String("entry", conf.Database.Host+":"+fmt.Sprintf("%d", conf.Database.Port)), slog.String("connect", "successfully"))

	fb := apis.NewFiberAPI(mgc)

	return &app{
		config: conf,
		fiber:  fb,
		mgc:    mgc,
	}, nil
}

func (a *app) Runner(ctx context.Context) error {
	g, c := errgroup.WithContext(ctx)

	g.Go(func() error {
		path := net.JoinHostPort("0.0.0.0", strconv.Itoa(a.config.Server.Port))
		fmt.Println("Server is running on", path)
		return a.fiber.Listen(path)
	})

	g.Go(func() error {
		<-c.Done()
		return a.fiber.ShutdownWithContext(c)
	})

	return g.Wait()
}
