package main

import (
    "log"
    "net/http"
	"fmt"
	"os"
)

func main() {
	http.HandleFunc("/flag", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "ERROR: ???")
		return
	})

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.URL)
			path := r.URL.String()
			path = "/tmp" + path
			fmt.Println(path)
			content, err := os.ReadFile(path)
			if err != nil {
				fmt.Fprintf(w, "ERROR")
				return
			}
			fmt.Fprintf(w, string(content))
		})
	fmt.Println("Server listening on port 8081...")
    log.Fatal(http.ListenAndServe(":8081", nil))

}