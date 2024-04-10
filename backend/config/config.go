package config

import (
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/shirou/gopsutil/v3/host"
	"github.com/spf13/viper"
)

type (
	AppConfig struct {
		HostID     string
		HostnName  string
		SecretKey  string
		ExpireTime time.Duration
		Database   Database
		Server     Server
	}

	Database struct {
		Host         string
		Port         int
		Databasename string
		Username     string
		Password     string
	}

	Server struct {
		addr string
		Port int
	}
)

func NewAppConfig(file string) (*AppConfig, error) {
	info, err := host.Info()
	if err != nil {
		return nil, err
	}

	// get path config
	ext, err := os.Executable()
	if err != nil {
		return nil, err
	}

	if file != "" {
		viper.SetConfigFile(file)
	} else {
		viper.SetConfigName("config")
		viper.SetConfigType("yml")
		viper.AddConfigPath(filepath.Join(filepath.Dir(ext), "conf"))
	}

	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	if err := viper.ReadInConfig(); err != nil {
		return nil, err
	}

	return &AppConfig{
		HostID: 	 info.HostID,
		HostnName:   info.Hostname,
		SecretKey:  viper.GetString("secret.key"),
		ExpireTime: 24 * time.Hour,
		Database:   getDatabase(),
		Server: Server{
			addr: viper.GetString("server.addr"),
			Port: viper.GetInt("server.port"),
		},
	}, nil
}

func getDatabase() Database {
	return Database{
		Host:         viper.GetString("mongo.host"),
		Port:         viper.GetInt("mongo.port"),
		Databasename: viper.GetString("mongo.database"),
		Username:     viper.GetString("mongo.username"),
		Password:     viper.GetString("mongo.password"),
	}
}