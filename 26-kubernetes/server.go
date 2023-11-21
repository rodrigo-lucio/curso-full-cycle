package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", Hello)
	http.ListenAndServe(":8000", nil)
}

func Hello(w http.ResponseWriter, r *http.Request) {

	host:= os.Getenv("my_host")
	port:= os.Getenv("my_port")
	database:= os.Getenv("my_database")

	fmt.Fprintf(w, "Application envs: host: %s, port: %s, database: %s", host, port, database)
}