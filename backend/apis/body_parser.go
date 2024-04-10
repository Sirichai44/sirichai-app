package apis

import "github.com/gofiber/fiber/v3"

func HandleResponse[RES any](handle func() (RES,error)) fiber.Handler {
	
}