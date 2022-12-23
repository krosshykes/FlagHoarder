package router

import (
	"github.com/gorilla/mux"
	"github.com/krosshykes/FlagHoarder/backend/middleware"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/forensic/challenges", middleware.GetAllChallenges).Methods("GET")
	router.HandleFunc("/api/forensic/run", middleware.RunCommand).Methods("POST")
	return router
}
