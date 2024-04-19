# # Use a minimal base image
# FROM golang:latest AS backend

# # Set the Current Working Directory inside the container
# WORKDIR /backend-build

# # COPY backend/go.mod backend/go.sum ./
# # RUN go mod download

# # Copy the source code from the current directory to the Working Directory inside the container
# COPY ./backend .

# # Build the Go app
# RUN CGO_ENABLED=0 go build -o sirichai cmd/main.go

# # Start from a smaller, minimal base image
# FROM alpine:latest  

# WORKDIR /usr/local/sirichai

# RUN apk add --no-cache tzdata
# ENV TZ="UTC"

# # Copy the Pre-built binary file from the previous stage
# COPY --from=backend /backend-build/sirichai /usr/local/sirichai/

# # Expose port 8080 to the outside world
# EXPOSE 8080

# ENV MODE "production"
# ENV PORT 8080

# # Command to run the executable
# CMD ["./sirichai", "--config=''"]
# # ENTRYPOINT ["./sirichai"]
# Dockerfile
FROM golang:1.22-alpine AS builder

ARG BUILD_DATE
ARG BUILD_VERSION
ARG BUILD_TAG

LABEL BUILD_DAY=$BUILD_DATE
LABEL BUILD_VERSION=$BUILD_VERSION
LABEL BUILD_TAG=$BUILD_TAG

WORKDIR /backend-build

COPY ./backend .

RUN go mod download

RUN CGO_ENABLED=0 go build -o sirichai cmd/main.go

#second stage
# FROM scratch
FROM alpine:latest  

WORKDIR /
COPY --from=builder /backend-build/sirichai /sirichai
COPY /backend/cmd/conf/ /conf
EXPOSE 8080

ENV MODE "production"
ENV PORT 8080

# CMD ["./sirichai", "--config=''"]
CMD ["./sirichai --config=''"]

