package main

import (
	"database/sql"
	db2 "github.com/codedu/go-hexagonal/adapters/db"
	"github.com/codedu/go-hexagonal/application"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, _ := sql.Open("sqlite3", "db.sqlite")
	productDbAdapter := db2.NewProductDb(db)
	productService := application.NewProductService(productDbAdapter)

	product, _ := productService.Create("IPHONE 15", 4500)
	productService.Enable(product)
}
