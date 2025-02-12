package main

import "fmt"

func main() {

	for i := 0; i < 5; i++ {
		fmt.Println(i)
	}
	j := 0
	for j < 3 {
		fmt.Println(j)
		j++
	}
	numbers := []int{1, 2, 3}
	for index, value := range numbers {
		fmt.Printf("Index: %d, Value: %d\n", index, value)
	}

	k := 0
	for {
		fmt.Println(k)
		k++
		if k > 10 {
			break
		}
	}
}
