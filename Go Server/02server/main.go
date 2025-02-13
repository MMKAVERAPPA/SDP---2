package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Flight struct {
	ID     string `json:"id"`
	Number string `json:"number"`
	Model  string `json:"model"`
	Type   string `json:"type"`
}

var flights []Flight = []Flight{
	{ID: "1", Number: "ABC123", Model: "Boeing", Type: "Commercial"},
	{ID: "2", Number: "DEF456", Model: "Airbus", Type: "Private"},
	{ID: "3", Number: "GHI789", Model: "Cessna", Type: "Cargo"},
}

func readAllFlights(c *gin.Context) {
	c.JSON(http.StatusOK, flights)
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	r.POST("/flights", createFlight)
	r.GET("/flights", readAllFlights)
	r.GET("/flights/:id", readFlightById)

	r.Run(":8080") // Start the server on port 8080
}

func readFlightById(c *gin.Context) {
	id := c.Param("id")
	for _, flight := range flights {
		if flight.ID == id {
			c.JSON(http.StatusOK, flight)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Flight not found"})
}

func createFlight(c *gin.Context) {
	var jbodyFlight Flight

	if err := c.BindJSON(&jbodyFlight); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate a new unique ID
	newID := fmt.Sprintf("%d", len(flights)+1)
	jbodyFlight.ID = newID

	flights = append(flights, jbodyFlight)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Flight created successfully",
		"flight":  jbodyFlight,
	})
}
