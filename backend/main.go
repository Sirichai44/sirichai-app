package main

import (
	"fmt"
	"log/slog"
	"myapp/config"
	apis "myapp/handler"
)


func main() {
conf := config.NewAppConfig()

	// mgc,err := drivers.MongoDBConn(conf.Database)
	slog.Info("MongoDB", slog.String("entry", conf.Database.Host + ":" + fmt.Sprintf("%d", conf.Database.Port)), slog.String("connect", "successfully"))
	// if err != nil {
	// 	slog.Error(err.Error())
	// 	panic(err)
	// }





	f := apis.NewFiberAPI()
f.Listen(":8080")
	apis.NewHandleAuth(f)
	// api_Version := "v2"
	// apiPath := "/api/" + api_Version
	// app := fiber.New()

	// app.Post(apiPath+"/register", func(c *fiber.Ctx) error {
	// 	data := &dtos.DtosRegister{}
	// 	if err := c.BodyParser(data); err != nil {
	// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	// 			"message": "Invalid request body",
	// 		})
	// 	}
	// 	validate := validator.New()
	// 	if err := validate.Struct(data); err != nil {
	// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	// 			"message": err.Error(),
	// 		})
	// 	}
	// 	fmt.Printf("Register data: %v\n", data)
	// 	return c.JSON(fiber.Map{
	// 		"message": "Register successfully",
	// 	})
	// })

	// port := ":8080"
	// fmt.Printf("Server is listening on port %s\n", port)
	// if err := app.Listen(port); err != nil {
	// 	slog.Error(err.Error())
	// 	panic(err)
	// }
}

// func genToken(username string) (tokenString string) {
// 	claims := jwt.MapClaims{"sub": username, "exp": time.Now().Add(tokenExpiration).Unix()}
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

// 	tokenString, err := token.SignedString([]byte(secretKey))
// 	if err != nil {
// 		slog.Error(err.Error())
// 		panic(err)
// 	}

// 	slog.Info("Gen token: " + tokenString)

// 	return tokenString
// }
