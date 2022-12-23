package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/krosshykes/FlagHoarder/backend/router"
)

func main() {
	r := router.Router()
	fmt.Println("Starting server on 9000")
	log.Fatal(http.ListenAndServe(":9000", r))
}
