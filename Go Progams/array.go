package main

import "fmt"

func main() {
	var arr [3]int
	arr[0] = 10
	arr[1] = 20
	arr[2] = 30
	fmt.Println(arr)

	//Slice(dynamic slice)
	slice := []int{1, 2, 3, 4, 5}
	fmt.Println(slice)

	//Slice operations
	fmt.Println(slice[1:4]) // Slice from index 1 (inclusive) to 4 (exclusive)
	fmt.Println(len(slice))
	fmt.Println(cap(slice)) // Capacity of Slice

	slice = append(slice, 6) //Add and element to the slice
	fmt.Println(slice)

	makeSlice := make([]int, 3, 5)
	fmt.Println(makeSlice, len(makeSlice), cap(makeSlice))

	fmt.Println(len(slice[1:4]))
	fmt.Println(cap(slice[1:4]))

}
