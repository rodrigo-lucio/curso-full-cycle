package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", Hello)
	http.HandleFunc("/configmap", ConfigMap)
	http.HandleFunc("/secret", Secret)
	http.ListenAndServe(":8000", nil)
}

func Hello(w http.ResponseWriter, r *http.Request) {

	host:= os.Getenv("my_host")
	port:= os.Getenv("my_port")
	database:= os.Getenv("my_database")

	fmt.Fprintf(w, "Application envs by deployment.yml : host: %s, port: %s, database: %s", host, port, database)
}


func ConfigMap(w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadFile("/go/myconfs/myconfs.txt")
	if err != nil {
		log.Fatal("Error reading file: ", err)
	}
	
	fmt.Fprintf(w, "Application envs by myconfs.txt: %s.", string(data))
}

func Secret(w http.ResponseWriter, r *http.Request) {
	user:= os.Getenv("USER")
	password:= os.Getenv("PASSWORD")
	fmt.Fprintf(w, "User: %s. Password: %s", user, password)
}