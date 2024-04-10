package config

import (
	"log/slog"
	"strings"
	"time"

	"github.com/spf13/viper"
)

type (
	AppConfig struct {
		SecretKey  string
		ExpireTime time.Duration
		Database   Database
	}

	Database struct {
		Host         string
		Port         int
		Databasename string
		Username     string
		Password     string
	}
)

func NewAppConfig() *AppConfig {
	viper.SetConfigName("config")
	viper.SetConfigType("yml")
	viper.AddConfigPath(".")
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	if err := viper.ReadInConfig(); err != nil {
		slog.Error(err.Error())
		panic(err)
	}

	return &AppConfig{
		SecretKey:  viper.GetString("secret.key"),
		ExpireTime: 24 * time.Hour,
		Database:   getDatabase(),
	}
}

func getDatabase() Database {
	return Database{
		Host:         viper.GetString("mongo.host"),
		Port:         viper.GetInt("mongo.port"),
		Databasename: viper.GetString("mongo.database"),
		Username: 	 viper.GetString("mongo.username"),
		Password: 	 viper.GetString("mongo.password"),
	}
}
