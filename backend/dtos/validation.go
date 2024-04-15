package dtos

import (
	"net/http"
	"strconv"
)

type ErrorValidation struct {
	Tag     string `json:"tag"`
	Field   string `json:"field"`
	Message string `json:"message"`
}

type APIError struct {
	Code int
	Message  string
	Err  error
}

func (e *APIError) Error() string {
	err := "Error"
	if e.Err != nil {
		err = e.Err.Error()
	}

	if e.Err == nil && e.Code > 0 {
		err = http.StatusText(e.Code)
	}

	if e.Message == "" {
		e.Message = "StatusCode"
	}

	return e.Message + " " + strconv.Itoa(e.Code) + ": " + err
}