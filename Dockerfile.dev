FROM golang:1.22-alpine

WORKDIR /app

RUN go install github.com/cosmtrek/air@latest

COPY go.mod go.sum ./
RUN go mod download

COPY ./cmd ./cmd

CMD ["air", "-c", ".air.toml"]