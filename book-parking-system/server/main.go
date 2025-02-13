package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Config
var mongoUri string = "mongodb://localhost:27017"
var mongoDbName string = "library_db"
var mongoCollectionBook string = "books"

// Database variables
var mongoclient *mongo.Client
var bookCollection *mongo.Collection

// Model Book for Collection "books"
type Book struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Title    string             `json:"title" bson:"title"`
	Author   string             `json:"author" bson:"author"`
	Genre    string             `json:"genre" bson:"genre"`
	ImageURL string             `json:"image_url" bson:"image_url"`
}

// Connect to MongoDB
func connectDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var errConnection error
	mongoclient, errConnection = mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if errConnection != nil {
		log.Fatal("MongoDB Connection Error:", errConnection)
	}

	bookCollection = mongoclient.Database(mongoDbName).Collection(mongoCollectionBook)
	fmt.Println("Connected to MongoDB!")
}

// POST /books
func createBook(c *gin.Context) {
	var jbodyBook Book

	// Bind JSON body to jbodyBook
	if err := c.BindJSON(&jbodyBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Insert book into MongoDB
	result, err := bookCollection.InsertOne(ctx, jbodyBook)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create book"})
		return
	}

	// Extract the inserted ID
	bookId, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse inserted ID"})
		return
	}
	jbodyBook.ID = bookId

	// Return created book
	c.JSON(http.StatusCreated, gin.H{
		"message": "Book created successfully",
		"book":    jbodyBook,
	})
}

// GET /books
func readAllBooks(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := bookCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch books"})
		return
	}
	defer cursor.Close(ctx)

	var books []Book
	if err := cursor.All(ctx, &books); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse books"})
		return
	}

	c.JSON(http.StatusOK, books)
}

// GET /books/:id
func readBookById(c *gin.Context) {
	id := c.Param("id")

	// Convert string ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var book Book
	err = bookCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&book)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	c.JSON(http.StatusOK, book)
}

// PUT /books/:id
func updateBook(c *gin.Context) {
	id := c.Param("id")
	// Convert string ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	var jbodyBook Book

	if err := c.BindJSON(&jbodyBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var oldBook Book

	err = bookCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&oldBook)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}
	oldBook.Title = jbodyBook.Title
	oldBook.Author = jbodyBook.Author
	oldBook.Genre = jbodyBook.Genre

	result, err := bookCollection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": oldBook})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update book"})
		return
	}

	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}
	// Return updated book
	c.JSON(http.StatusOK, gin.H{
		"message": "Book updated successfully",
		"book":    oldBook,
	})
}

// DELETE /books/:id
func deleteBook(c *gin.Context) {
	id := c.Param("id")
	// Convert string ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, errDelete := bookCollection.DeleteOne(ctx, bson.M{"_id": objectID})
	if errDelete != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete book"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book deleted successfully"})
}

func uploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to upload image"})
		return
	}

	// Save the image to the "uploads" folder
	filePath := fmt.Sprintf("uploads/%s", file.Filename)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	// Return the image URL
	c.JSON(http.StatusOK, gin.H{"message": "Image uploaded successfully", "image_url": filePath})
}

func main() {
	// Connect to MongoDB
	connectDB()

	// Set up Gin router
	r := gin.Default()
	// CORS Configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"}, // React frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	// Routes
	r.POST("/books", createBook)
	r.GET("/books", readAllBooks)
	r.GET("/books/:id", readBookById)
	r.PUT("/books/:id", updateBook)
	r.DELETE("/books/:id", deleteBook)
	r.POST("/upload", uploadImage)
	r.Static("/uploads", "./uploads")
	// Start server
	r.Run(":8080")
}
