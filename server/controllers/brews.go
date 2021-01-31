package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/clydotron/skt_mongo/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

// BrewController x
type BrewController struct {
	collection *mongo.Collection
}

// NewBrewController create new keg controller
func NewBrewController(c *mongo.Collection) *BrewController {
	return &BrewController{c}
}

// CreateBrew create a new brew
func (bc *BrewController) CreateBrew(c *gin.Context) {

	b := models.Brew{}
	json.NewDecoder(c.Request.Body).Decode(&b)

	b.ID = primitive.NewObjectID()
	b.BrewDate = time.Now()

	resp, err := bc.collection.InsertOne(context.Background(), b)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "mongo.InsertOne failed")
		return
	}
	fmt.Println(resp)

	c.JSON(http.StatusCreated, b)
}

// GetBrew the usual
func (bc *BrewController) GetBrew(c *gin.Context) {

	//check for id="index"?

	objID, ok := extractId(c)
	if !ok {
		return
	}

	b := models.Brew{}
	filter := bson.M{"_id": objID}

	err := bc.collection.FindOne(context.Background(), filter).Decode(&b)
	if err != nil {
		c.String(http.StatusNotFound, "not found")
	} else {
		c.JSON(http.StatusOK, b)
	}
}

// GetAllBrews the usual
func (bc *BrewController) GetAllBrews(c *gin.Context) {
	cur, err := bc.collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	defer cur.Close(context.Background())

	brews := []models.Brew{}

	for cur.Next(context.Background()) {

		b := models.Brew{}
		err := cur.Decode(&b)
		if err != nil {
			log.Fatal(err)
		}
		brews = append(brews, b)
	}

	c.JSON(http.StatusOK, brews)
}
