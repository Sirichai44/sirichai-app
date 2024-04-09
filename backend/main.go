package main

import (
	"fmt"
	"log/slog"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

const (
	secretKey       = "sirichai-44-secret-key"
	tokenExpiration = 24 * time.Hour
)

func generateToken(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = username
	claims["exp"] = time.Now().Add(tokenExpiration).Unix()

	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func jwtMiddleware(c *fiber.Ctx) error {
	tokenString := c.Get("Authorization")
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	tokenString = tokenString[7:] // remove "Bearer " prefix

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	return c.Next()
}

func main() {
	api_Version := "v2"
	apiPath := "/api/" + api_Version
	app := fiber.New()

 type User struct {
		Username string `json:"username"`
		Password string `json:"password"`
 }
	app.Post(apiPath+"/register", func(c *fiber.Ctx) error {

		data := new(User)
		if err := c.BodyParser(data); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Invalid request body",
			})
		}

		fmt.Println("username: ", data.Username)
		if data.Username == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Username is required",
			})
		}

		token, err := generateToken(data.Username)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Failed to generate token",
			})
		}

		return c.JSON(fiber.Map{
			"token": token,
		})
		
	})

	port := ":8080"
	fmt.Printf("Server is listening on port %s\n", port)
	if err := app.Listen(port); err != nil {
		slog.Error(err.Error())
		panic(err)
	}

}
