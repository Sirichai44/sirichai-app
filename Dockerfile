# Build the frontend
FROM node:20-alpine AS frontend

WORKDIR /frontend-build

COPY package.json ./
COPY src/ src/

RUN yarn install
RUN yarn build

# Build the backend
FROM golang:1.22-alpine AS backend

WORKDIR /backend-build

RUN apk add --no-cache git

RUN go install github.com/cosmtrek/air@latest


COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY . .

RUN ./backend/go build -o main ./cmd/main.go 

# Build the final image
FROM alpine:latest AS monolithic

WORKDIR /usr/local/sirichai

RUN apk add --no-cache tzdata
ENV TZ="UTC"

COPY --from=frontend /frontend-build/dist /usr/local/sirichai/dist
COPY --from=backend /backend-build/  /usr/local/sirichai/app/

EXPOSE 8080

CMD ["./cmd/"]
