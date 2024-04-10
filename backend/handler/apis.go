package apis

import (
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

var (
	appVersion = "v1.0.0"
	apiVersion = "api/v3"
	Fiber      = fiber.Config{
		ServerHeader: appVersion,
		AppName:      "Sirichai" + " - " + "app" + appVersion,
		BodyLimit:    10 * 1024 * 1024, // 10 MB
	}

	FiberCORS = cors.New(cors.Config{
		Next:         nil,
		AllowOrigins: "http://localhost:8086",
		AllowMethods: strings.Join([]string{fiber.MethodGet, fiber.MethodPost, fiber.MethodPut, fiber.MethodPatch, fiber.MethodDelete}, ","),
		AllowHeaders: "Origin, Content-Type, Accept, Accept-Language, Content-Length",
	})
)

func NewFiberAPI() *fiber.App {
	f := fiber.New(Fiber)
	f.Use(FiberCORS)

	return f
}
