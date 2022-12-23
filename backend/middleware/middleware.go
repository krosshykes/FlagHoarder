package middleware

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/krosshykes/FlagHoarder/backend/models"
)

func GetAllChallenges(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	dirs, err := os.ReadDir("files/Forensics")
	if err != nil {
		log.Fatalln(err.Error())
	}
	var ch models.Forensic
	var challenge models.Challenge
	for _, f := range dirs {
		challenge.Name = f.Name()
		challenge.Commands = getSolutions(f.Name())
		ch.Challenges = append(ch.Challenges, challenge)
	}
	json.NewEncoder(w).Encode(ch)
}
func RunCommand(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var run models.Run
	err := json.NewDecoder(r.Body).Decode(&run)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	cmd := exec.Command(run.Command, run.Arguments...)
	cmd.Stdin = strings.NewReader(run.Input)
	var out bytes.Buffer
	cmd.Stdout = &out
	err = cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
	var op models.Output
	op.Value = out.String()
	err = json.NewEncoder(w).Encode(op)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
}

func getSolutions(filename string) []string {
	var solutions []string
	ext := strings.Split(filename, ".")[1]
	switch ext {
	case "img":
		solutions = append(solutions, diskImage(filename)...)
	}
	return solutions
}

func diskImage(filename string) []string {
	// var solutions []string
	solutions := []string{
		"cd files/Forensics",
		"sudo mount " + filename + " /mnt/img/",
		"cd /mnt/img",
		"ls",
	}
	return solutions
}
