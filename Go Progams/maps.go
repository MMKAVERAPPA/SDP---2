package main

import "fmt"

func main() {
	//Creating a map
	myMap := make(map[string]int)

	//Accessing values
	myMap["apple"] = 1
	myMap["banana"] = 2

	//
	fmt.Println(myMap["apple"])

	//Checking if map exists
	value, ok := myMap["grape"]

	if ok {
		fmt.Println(value)
	} else {
		fmt.Println("Key not found")
	}

	//Deleting a map
	delete(myMap, "banana")
	fmt.Println(myMap)

	for key, value := range myMap {
		fmt.Printf("Key :%s, Value :%d\n", key, value)
	}

}
