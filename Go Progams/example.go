package main

import "fmt"

func main() {
	age := 20

	if age >= 18 {
		fmt.Println("Adult")
	} else {
		fmt.Println("Minor")
	}

	if x := 10; x > 5 {
		fmt.Println("x is greater than 5")
	}

}
