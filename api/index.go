package api

import (
	"fmt"
	"net/http"
)

// Add CORS headers to the response
// func _enableCors(w *http.ResponseWriter) {
// 	(*w).Header().Set("Access-Control-Allow-Origin", "*") // Corrected to match the React app's origin
// 	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
// 	(*w).Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
// }

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*") // Adjust as needed
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	if r.Method == "OPTIONS" {
		return // CORS preflight request, just return with headers
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"message": "SGVsbG93LCBXb3JsZCBHbyE="}`)
}
