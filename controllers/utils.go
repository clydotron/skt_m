package controllers

import (
	"context"
	"net/http"
	"unicode/utf8"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

func trimFirstRune(s string) string {
	_, i := utf8.DecodeRuneInString(s)
	return s[i:]
}

// extractId
func extractId(c *gin.Context) (primitive.ObjectID, bool) {
	id := c.Param("id")
	if id == "" {
		c.String(http.StatusBadRequest, "bad request")
		return primitive.NilObjectID, false
	}

	obj, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.String(http.StatusBadRequest, "bad request: incorrect format")
		return primitive.NilObjectID, false
	}

	return obj, true
}

func createX(c *gin.Context, collection *mongo.Collection, v interface{}) {

	// json.NewDecoder(c.Request.Body).Decode(&v)

	// v.ID = primitive.NewObjectID()

	// _, err := collection.InsertOne(context.Background(), v)
	// if err != nil {
	// 	log.Fatal(err)
	// 	return
	// }
}

func getX(c *gin.Context, collection *mongo.Collection, v *interface{}) bool {

	objID, ok := extractId(c)
	if !ok {
		return false
	}

	filter := bson.M{"_id": objID}
	err := collection.FindOne(context.Background(), filter).Decode(v)
	if err != nil {
		c.String(http.StatusNotFound, "not found")
		return false
	}

	return true
}
