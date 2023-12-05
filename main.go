package main

import (
	"Gin/api"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", api.IndexHandler)
	http.HandleFunc("/ws", api.WebSocketHandler)

	// Log a startup message
	log.Println("Server is starting on port 8080...")

	// Start the server
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
