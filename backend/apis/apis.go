package apis

import (
	"fmt"
	"log/slog"
	"strings"

	"myapp/drivers"
	"myapp/services"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	appVersion = "v1.0.0"
	apiVersion = "/api/v3"
	Fiber      = fiber.Config{
		ServerHeader: appVersion,
		BodyLimit:    10 * 1024 * 1024, // 10 MB
	}

	FiberCORS = cors.New(cors.Config{
		Next:         nil,
		AllowOrigins: "http://localhost:3000,https://sirichai-app.onrender.com",
		AllowMethods: strings.Join([]string{fiber.MethodGet, fiber.MethodPost, fiber.MethodPut, fiber.MethodPatch, fiber.MethodDelete}, ","),
		AllowHeaders: "Origin, Content-Type, Accept, Accept-Language, Content-Length",
	})
)

func NewFiberAPI(mgc *drivers.MongoDBClient, srvAuth services.AuthService) *fiber.App {
	f := fiber.New()
	f.Use(FiberCORS)
	f.Use(recover.New())
	f.Use(func(c *fiber.Ctx) error {
		slog.Info(fmt.Sprintf("%s %s from %s", c.Method(), c.Path(), c.IP()))
		return c.Next()
	})

	NewHandleAuth(f, mgc, srvAuth)

	return f
}
