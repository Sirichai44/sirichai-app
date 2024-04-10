package main

import (
	"fmt"
	"myapp/app"

	"github.com/spf13/cobra"
)

func init() {
	cobra.OnInitialize(printgreeting)
}

func printgreeting() {
	fmt.Printf(`
Server starting...
Version: %s
Listen on port: %s
driver: %s,
`, "v1.0.0", "8080", "MongoDB")
}

func main() {
	roodCmd := app.NewAppRoot()
	if err := roodCmd.Execute(); err != nil {
		panic(err)
	}
}
