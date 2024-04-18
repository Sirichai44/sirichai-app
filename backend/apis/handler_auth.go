package apis

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"time"

	"myapp/drivers"
	"myapp/dtos"
	"myapp/services"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type auth struct {
	srv services.AuthService
}

type Context struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Results interface{} `json:"results"`
}

func NewContext(code int, msg string, res any) *Context {
	fmt.Printf("res: %v", res)
	return &Context{
		Status:  code,
		Message: msg,
		Results: res,
	}
}

func NewHandleAuth(f fiber.Router, mgc *drivers.MongoDBClient, srvAuth services.AuthService) {
	auth := auth{srv: srvAuth}

	g := f.Group(apiVersion).Group("/auth")
	g.Get("", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  fiber.StatusOK,
			"message": "OK",
			"results": "Auth",
		})
	})

	g.Post("/register", HandleBodyParser(auth.Register))
	g.Post("/login", HandleBodyParser(auth.Login))
}

func (a *auth) Register(dto dtos.DtoRegister) (*Context, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	find, err := a.srv.FindOneKeyValue(ctx, "email", dto.Email)
	if err != nil {
		if !errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fiber.ErrNotAcceptable
		}
	}

	if find != nil {
		slog.Warn("Register", slog.String("entry", "FindOneKeyValue"), slog.String("email", "already exists"))
		return nil, &dtos.APIError{Code: fiber.StatusNotAcceptable, Message: "Duplicate", Err: errors.New("name already exists")}
	}

	passHash, err := bcrypt.GenerateFromPassword([]byte(dto.Password), bcrypt.DefaultCost)
	if err != nil {
		slog.Error("Register", slog.String("entry", "GenerateFromPassword"), slog.String("password", "failed"))
		return nil, fiber.ErrNotAcceptable
	}

	rgt := dtos.Register{
		ID:        primitive.NewObjectID(),
		Email:     dto.Email,
		Username:  dto.Username,
		Password:  string(passHash),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	if err := a.srv.Create(ctx, rgt); err != nil {
		slog.Error("Register", slog.String("entry", "Create"), slog.String("register", "failed"))
		return nil, err
	}

	token := genToken(rgt.Username, rgt.Email)

	slog.Info("Register", slog.String("id", rgt.ID.Hex()), slog.String("register", "successfully"))

	return NewContext(fiber.StatusCreated, "register successfully",
		fiber.Map{
			"token": token,
		},
	), nil
}

func (a *auth) Login(dto dtos.DtoLogin) (*Context, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	find, err := a.srv.FindOneKeyValue(ctx, "email", dto.Email)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			slog.Warn("Login", slog.String("entry", "FindOneKeyValue"), slog.String("email", "not found"))
			return nil, &dtos.APIError{Code: fiber.StatusNotFound, Message: "Not Found", Err: errors.New("email not found")}
		}
	}

	err = bcrypt.CompareHashAndPassword([]byte(find.Password), []byte(dto.Password))
	if err != nil {
		slog.Warn("Login", slog.String("entry", "CompareHashAndPassword"), slog.String("password", "incorrect"))
		return nil, &dtos.APIError{Code: fiber.StatusUnauthorized, Message: "Unauthorized", Err: errors.New("password incorrect")}
	}

	a.srv.FindOneAndUpdate(ctx, "_id", find.ID, bson.D{{Key: "$set", Value: bson.D{{Key: "updated_at", Value: time.Now()}}}})

	token := genToken(find.Username, find.Email)

	slog.Info("Login", slog.String("id", find.ID.Hex()), slog.String("login", "successfully"))
	return NewContext(fiber.StatusOK, "login successfully", fiber.Map{
		"token": token,
	}), nil
}

func genToken(username, email string) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":    email,
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24),
	})

	tokenString, err := token.SignedString([]byte("sirichai-44-secret-key"))
	if err != nil {
		slog.Error("Gentoken", slog.String("entry", "SignedString"), slog.String("token", "failed"))
		return ""
	}

	return tokenString
}
