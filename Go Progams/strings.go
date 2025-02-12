package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "Hello, Go!"

	fmt.Println(len(str)) //Length of the string
	fmt.Println(str[0])   // Accessing individual characters (bytes)
	fmt.Println(str[0:5]) // Slicing strings

	fmt.Println(strings.Contains(str, "Go")) //Check if a substring exists
	fmt.Println(strings.ToUpper(str))        // Convert to uppercase
	fmt.Println(strings.Split(str, ","))     // Split the string by a delimiter

	slice := strings.Split(str, ",")

	fmt.Println(len(slice))
	fmt.Println(len(slice[0]))
}
