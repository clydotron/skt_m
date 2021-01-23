package controllers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/clydotron/skt_mongo/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

// TransactionController x
type TransactionController struct {
	collection *mongo.Collection
}

// NewTransactionController create new customer controller
func NewTransactionController(c *mongo.Collection) *TransactionController {
	return &TransactionController{c}
}

// CreateTransaction create a transaction record
func (tc *TransactionController) CreateTransaction(c *gin.Context) {

	transaction := models.Transaction{}
	json.NewDecoder(c.Request.Body).Decode(&transaction)

	transaction.ID = primitive.NewObjectID()
	transaction.Created = time.Now()

	_, err := tc.collection.InsertOne(context.Background(), transaction)
	if err != nil {
		log.Fatal(err)
		return
	}

	// should we use the customer from the response?
	c.JSON(http.StatusCreated, transaction)
}

// GetTransaction
func (tc *TransactionController) GetTransaction(c *gin.Context) {

	objID, ok := extractId(c)
	if !ok {
		return
	}

	t := models.Transaction{}

	filter := bson.M{"_id": objID}
	err := tc.collection.FindOne(context.Background(), filter).Decode(&t)
	if err != nil {
		c.String(http.StatusNotFound, "not found")
		return
	}

	c.JSON(http.StatusOK, t)
}

func (tc *TransactionController) GetAllTransactions(c *gin.Context) {

	cur, err := tc.collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer cur.Close(context.Background())

	ts := []models.Transaction{}

	for cur.Next(context.Background()) {

		t := models.Transaction{}
		err := cur.Decode(&t)
		if err != nil {
			log.Fatal(err)
		}
		ts = append(ts, t)
	}

	c.JSON(http.StatusOK, ts)
}
