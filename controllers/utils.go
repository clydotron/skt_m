package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
