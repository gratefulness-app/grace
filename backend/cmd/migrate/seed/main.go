package main

import (
	"log"

	"github.com/gratefulness-app/grace/internal/db"
	"github.com/gratefulness-app/grace/internal/env"
	"github.com/gratefulness-app/grace/internal/store"
)

func main() {
	addr := env.GetString("DB_ADDR", "postgres://admin:adminpassword@localhost/grace?sslmode=disable")
	conn, err := db.New(addr, 3, 3, "15m")
	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close()

	store := store.NewStorage(conn)

	db.Seed(store, conn)
}
