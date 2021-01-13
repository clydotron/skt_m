package controllers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/clydotron/skt_mongo/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

// CustomerController x
type CustomerController struct {
	collection *mongo.Collection
}

// NewCustomerController create new customer controller
func NewCustomerController(c *mongo.Collection) *CustomerController {
	return &CustomerController{c}
}

// CreateCustomer w
func (cc *CustomerController) CreateCustomer(c *gin.Context) {

	//fmt.Println(c.Request.Body)

	customer := models.Customer{}
	json.NewDecoder(c.Request.Body).Decode(&customer)

	customer.ID = primitive.NewObjectID()

	_, err := cc.collection.InsertOne(context.Background(), customer)
	if err != nil {
		log.Fatal(err)
		return
	}

	// should we use the customer from the response?
	c.JSON(http.StatusCreated, customer)
}

// GetAllCustomers w
func (cc *CustomerController) GetAllCustomers(c *gin.Context) {

	cur, err := cc.collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer cur.Close(context.Background())

	customers := []models.Customer{}

	for cur.Next(context.Background()) {

		customer := models.Customer{}
		err := cur.Decode(&customer)
		if err != nil {
			log.Fatal(err)
		}
		customers = append(customers, customer)
	}

	c.JSON(http.StatusOK, customers)
}

// GetCustomer
func (cc *CustomerController) GetCustomer(c *gin.Context) {

	objID, ok := extractId(c)
	if !ok {
		return
	}

	customer := models.Customer{}

	filter := bson.M{"_id": objID}
	err := cc.collection.FindOne(context.Background(), filter).Decode(&customer)
	if err != nil {
		c.String(http.StatusNotFound, "not found")
		return
	}

	c.JSON(http.StatusOK, customer)
}

// UpdateCustomer words
func (cc *CustomerController) UpdateCustomer(c *gin.Context) {

	objID, ok := extractId(c)
	if !ok {
		return
	}

	customer := models.Customer{}
	json.NewDecoder(c.Request.Body).Decode(&customer)

	result, err := cc.collection.ReplaceOne(context.Background(), bson.M{"_id": objID}, customer)
	if err != nil {
		c.String(http.StatusInternalServerError, "ReplaceOne failed")
		return
	}
	//check the result?
	if result.MatchedCount == 1 {
		c.JSON(http.StatusOK, customer)
	} else {
		c.String(http.StatusNotFound, "customer not found")
	}

}

// DeleteCustomer -- does just that
func (cc *CustomerController) DeleteCustomer(c *gin.Context) {

	objID, ok := extractId(c)
	if !ok {
		return
	}

	filter := bson.M{"_id": objID}
	result, err := cc.collection.DeleteOne(context.Background(), filter)
	if err != nil {
		c.String(http.StatusInternalServerError, "DeleteOne failed:")
		return
	}

	if result.DeletedCount == 1 {
		c.String(http.StatusOK, "Customer deleted")
	} else {
		c.String(http.StatusNotFound, "Customer not found")
	}
}
