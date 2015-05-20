package main

import (
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"
	"text/template"

	"github.com/joho/godotenv"
	"golang.org/x/net/websocket"
)

// SquareMultiplierHandler will square the data received on the WebSocket.
func SquareMultiplierHandler(ws *websocket.Conn) {
	for {
		var message string
		websocket.Message.Receive(ws, &message)
		f, _ := strconv.ParseFloat(message, 64)
		fmt.Fprintln(ws, math.Pow(f, 2))
	}
}

func serveTemplate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	data := struct {
		Title string
	}{
		"WSConnection Test",
	}
	t, _ := template.ParseFiles("tmpl/index.html")
	t.Execute(w, data)
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	http.Handle("/square", websocket.Handler(SquareMultiplierHandler))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", serveTemplate)

	fail := http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), nil)
	if fail != nil {
		log.Fatal("ListenAndServe: " + fail.Error())
	}
}
