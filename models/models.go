package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Keg
type Keg struct {
	Size     int                `json:"size"`
	Contents string             `json:"contents"`
	Status   string             `json:"status"`
	ID       primitive.ObjectID `json:"id" bson:"_id"`
}

// how much information should be included here
// Customer
type Customer struct {
	Name  string             `json:"name"`
	Email string             `json:"email"`
	Kegs  []Keg              `json:"kegs"`
	ID    primitive.ObjectID `json:"id" bson:"_id"`
	//phone #
}

type Transaction struct {
	ID primitive.ObjectID `json:"id" bson:"_id"`
	//CustomerID bson.ObjectId
	//KeyID      bson.ObjectId
	TimeStamp primitive.Timestamp `json:"timeStamp"`
	Type      string              `json:"type"`
}
