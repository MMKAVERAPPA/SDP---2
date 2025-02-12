package main

import (
	"net/http"

	"github.com/gin-contrib/cors" //need to import this using command promot usgin go get url
	"github.com/gin-gonic/gin"
)

type Car struct {
	ID     string `json:"id"`
	Number string `json:"number"`
	Model  string `json:"model"`
	Type   string `json:"type"`
}

var cars []Car = []Car{
	{ID: "1", Number: "ABC123", Model: "Toyota", Type: "Sedan"},
	{ID: "2", Number: "DEF456", Model: "Honda", Type: "SUV"},
	{ID: "3", Number: "GHI789", Model: "Ford", Type: "Truck"},
}

func readAllCar(c *gin.Context) {
	c.JSON(http.StatusOK, cars)
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	r.POST("/cars", createCar)
	r.GET("/cars", readAllCar)
	r.GET("/cars/:id", readCarById)

	r.Run(":8080")
}

func readCarById(c *gin.Context) {
	id := c.Param("id") //Use c.param to get the ID from the URL

	for _, car := range cars {
		if car.ID == id {
			c.JSON(http.StatusOK, car) // Use c.JSON to reutrn the car
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Car not found"})
}

func createCar(c *gin.Context) {
	var jbodyCar Car

	if err := c.BindJSON(&jbodyCar); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var createdCar Car = jbodyCar
	cars = append(cars, Car{ID: createdCar.ID, Number: createdCar.Number, Type: createdCar.Type})

	c.JSON(http.StatusOK, gin.H{
		"message": "Car created successfully",
		"car":     createdCar,
	})
}
