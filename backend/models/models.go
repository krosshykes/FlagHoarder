package models

type Run struct {
	Command   string   `json:"Command"`
	Arguments []string `json:"Arguments"`
	Input     string   `json:"Input"`
}
type Challenge struct {
	Name     string              `json:"Name"`
	Commands map[string][]string `json:"Commands"`
}
type Forensic struct {
	Challenges []Challenge `json:"Challenges"`
}
type Output struct {
	Value string `json:"Value"`
}
type Web struct{}
type ReverseEngineering struct{}
type Crypto struct{}
type Osint struct{}
type Pwn struct{}
