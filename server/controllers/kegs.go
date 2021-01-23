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

// KegController x
type KegController struct {
	collection *mongo.Collection
}

// NewKegController create new keg controller
func NewKegController(c *mongo.Collection) *KegController {
	return &KegController{c}
}

// CreateKeg w
func (kc *KegController) CreateKeg(c *gin.Context) {

	k := models.Keg{}
	json.NewDecoder(c.Request.Body).Decode(&k)

	k.ID = primitive.NewObjectID()

	_, err := kc.collection.InsertOne(context.Background(), k)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "mongo.InsertOne failed")
		return
	}

	// should we use the customer from the response?
	c.JSON(http.StatusCreated, k)
}

// GetKeg the usual
func (kc *KegController) GetKeg(c *gin.Context) {

	//check for id="index"?

	objID, ok := extractId(c)
	if !ok {
		return
	}

	k := models.Keg{}
	filter := bson.M{"_id": objID}

	err := kc.collection.FindOne(context.Background(), filter).Decode(&k)
	if err != nil {
		c.String(http.StatusNotFound, "not found")
	} else {
		c.JSON(http.StatusOK, k)
	}
}

// GetAllKegs the usual
func (kc *KegController) GetAllKegs(c *gin.Context) {
	cur, err := kc.collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	defer cur.Close(context.Background())

	kegs := []models.Keg{}

	for cur.Next(context.Background()) {

		k := models.Keg{}
		err := cur.Decode(&k)
		if err != nil {
			log.Fatal(err)
		}
		kegs = append(kegs, k)
	}

	c.JSON(http.StatusOK, kegs)
}

func (kc *KegController) HandleKegAction(c *gin.Context) {
	//action := c.Param("action")

	ki := models.KegInfo{}
	ki.TimeStamp = time.Now()
	ki.Action = trimFirstRune(c.Param("action"))

	fmt.Println("KI:", ki)
	// i could switch on the action, and use

	var anyJson map[string]interface{}
	json.NewDecoder(c.Request.Body).Decode(&anyJson)
	j, err := json.Marshal(anyJson)
	fmt.Println(j, err)
	ki.Data = j //anyJson //maybe?

	objID, ok := extractId(c)
	if !ok {
		return
	}

	filter := bson.M{"_id": objID}
	stuff := bson.M{"$addToSet": bson.M{"history": ki}}

	result, err := kc.collection.UpdateOne(context.Background(), filter, stuff)
	if err != nil {
		log.Fatal(err)
		//c.String(http.StatusInternalServerError,err)
	}
	fmt.Println("result: ", result)

	c.String(http.StatusOK, "added")
	//c.JSON(http.StatusOK, k)

}

// DeleteKeg delete a keg from the database
func (kc *KegController) DeleteKeg(c *gin.Context) {

	objID, ok := extractId(c)
	if !ok {
		return
	}

	result, err := kc.collection.DeleteOne(context.Background(), bson.M{"_id": objID})
	if err != nil {
		c.String(http.StatusInternalServerError, "Keg: DeleteOne failed:")
		return
	}

	if result.DeletedCount == 1 {
		c.String(http.StatusOK, "Keg deleted")
	} else {
		c.String(http.StatusNotFound, "Keg not found")
	}
}
