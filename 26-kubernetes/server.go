package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

var startedAt = time.Now()
var random = rand.Intn(100)

func main() {
	http.HandleFunc("/", Hello)
	http.HandleFunc("/configmap", ConfigMap)
	http.HandleFunc("/secret", Secret)
	http.HandleFunc("/startup", Startup)
	http.HandleFunc("/readiness", Readiness)
	http.HandleFunc("/healthz", Healthz)
	http.ListenAndServe(":8000", nil)
}

func Hello(w http.ResponseWriter, r *http.Request) {
	log.Println(fmt.Sprintf("Hello"))
	host := os.Getenv("my_host")
	port := os.Getenv("my_port")
	database := os.Getenv("my_database")

	fmt.Fprintf(w, "Application envs by deployment.yml : host: %s, port: %s, database: %s, random: %v", host, port, database, random)
}

func ConfigMap(w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadFile("/go/myconfs/myconfs.txt")
	if err != nil {
		log.Fatal("Error reading file: ", err)
	}

	fmt.Fprintf(w, "Application envs by myconfs.txt: %s.", string(data))
}

func Secret(w http.ResponseWriter, r *http.Request) {
	user := os.Getenv("USER")
	password := os.Getenv("PASSWORD")
	fmt.Fprintf(w, "User: %s. Password: %s", user, password)
}

func Startup(w http.ResponseWriter, r *http.Request) {
	duration := time.Since(startedAt)
	log.Println(fmt.Sprintf("Startup - Duration: %v"+
		"", duration.Seconds()))
	if duration.Seconds() < 10 {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf("Duration: %v", duration.Seconds())))
		log.Println(fmt.Sprintf("Startup - Not Started"))
	} else {
		log.Println(fmt.Sprintf("Startup - Started"))
		w.WriteHeader(200)
		w.Write([]byte("UP"))
	}
}

func Readiness(w http.ResponseWriter, r *http.Request) {
	duration := time.Since(startedAt)
	log.Println(fmt.Sprintf("Readiness - Duration: %v"+
		"", duration.Seconds()))
	if false { //duration.Seconds() < 25 || duration.Seconds() > 40 - Descomentar para testar as probes
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf("Duration: %v", duration.Seconds())))
		log.Println(fmt.Sprintf("Readiness - Not Ready"))
	} else {
		log.Println(fmt.Sprintf("Readiness - Ready"))
		w.WriteHeader(200)
		w.Write([]byte("UP"))
	}
}

func Healthz(w http.ResponseWriter, r *http.Request) {
	duration := time.Since(startedAt)
	log.Println(fmt.Sprintf("Healthz - Duration: %v"+
		"", duration.Seconds()))
	if false { // duration.Seconds() > 60  - Descomentar para testar as probes
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf("Duration: %v", duration.Seconds())))
		log.Println(fmt.Sprintf("Healthz - Down"))
	} else {
		log.Println(fmt.Sprintf("Healthz - UP"))
		w.WriteHeader(200)
		w.Write([]byte(fmt.Sprintf("UP - Random: %v", random)))
	}

}
