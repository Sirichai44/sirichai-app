package apis

import (
	"reflect"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/exp/slog"
)

func HandleResponse[RES any](handle func() (RES, error)) fiber.Handler {
	return func(c *fiber.Ctx) error {
		res, err := handle()
		if err != nil {
			return err
		}

		t := func(v any) any {
			ref := reflect.ValueOf(v)
			if (ref.Kind() == reflect.Pointer || ref.Kind() == reflect.Slice) && (v == nil || ref.IsNil()) {
				return []string{}
			} else {
				return v
			}
		}(res)

		return c.JSON(fiber.Map{
			"status":  fiber.StatusOK,
			"message": "OK",
			"results": t,
		})
	}
}

func HandleBodyParser[REQ, RES any](handle func(REQ) (RES, error)) fiber.Handler {
	return func(c *fiber.Ctx) error {
		const msg = "HandleBodyParser"
		var request REQ

		// validate
		if err := Validation(request); len(err) > 0 {
			slog.Debug(msg+"-Validation", "payload", request)
			return c.JSON(fiber.Map{
				"status":  fiber.StatusBadRequest,
				"message": "Validation failed",
				"results": nil,
			})
		}

		// Todo implement function handler.
		res, err := handle(request)
		if err != nil {
			return err
		}

		t := func(v any) any {
			ref := reflect.ValueOf(v)
			if (ref.Kind() == reflect.Pointer || ref.Kind() == reflect.Slice) && (v == nil || ref.IsNil()) {
				return []string{}
			} else {
				return v
			}
		}(res)

		return c.JSON(t)
	}
}
