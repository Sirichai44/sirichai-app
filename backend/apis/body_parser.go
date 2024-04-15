package apis

import (
	"context"
	"reflect"

	"github.com/gofiber/fiber/v2"
	"github.com/opentracing/opentracing-go"
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

func HandleBodyParser[REQ, RES any](handle func(c *fiber.Ctx, ctx context.Context, span opentracing.Span,REQ REQ) (RES, error)) fiber.Handler {
	return func(c *fiber.Ctx) error {
		const msg = "HandleBodyParser"
		var request REQ
		// ดึง span และ context จาก context ของ Fiber
		span := c.Context().Value("span").(opentracing.Span)
		ctx := c.Context().Value("ctx").(context.Context)

		// ทำสิ่งที่ต้องการด้วย span ที่ได้
		span.LogKV("message", "Handling request")
		if err := c.BodyParser(&request); err != nil {
			slog.Debug(msg, "payload", request)
			slog.Error(msg, slog.Any("err", err))
			return c.JSON(fiber.Map{
				"status":  fiber.StatusBadRequest,
				"message": "Parse body failed",
				"results": nil,
			})
		}

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
		res, err := handle(c, ctx, span, request)
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
