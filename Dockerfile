# Use a minimal base image
FROM golang:latest AS backend

# Set the Current Working Directory inside the container
WORKDIR /backend-build

# COPY backend/go.mod backend/go.sum ./
# RUN go mod download

# Copy the source code from the current directory to the Working Directory inside the container
COPY /backend .

# Build the Go app
RUN go build -o sirichai ./cmd

# Start from a smaller, minimal base image
FROM alpine:latest  

WORKDIR /app

RUN apk add --no-cache tzdata
ENV TZ="UTC"

# Copy the Pre-built binary file from the previous stage
COPY --from=backend /backend-build/sirichai /app/

# Change the permissions of the file to be executable
RUN chmod +x ./sirichai

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./sirichai"]
