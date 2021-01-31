package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// KegInfo struct
// do i really care about the ID
type KegInfo struct {
	//ID        primitive.ObjectID `json:"id" bson:"_id"`
	TimeStamp time.Time   `json:"timeStamp"`
	Action    string      `json:"action"`
	Data      interface{} `json:"data"`
}

// KegFillInfo ...
type KegFillInfo struct {
	BrewID primitive.ObjectID `json:"brewID"`
}

// Keg struct
type Keg struct {
	ID      primitive.ObjectID  `json:"id" bson:"_id"`
	Size    int                 `json:"size"`
	Code    string              `json:"code"`
	BrewID  *primitive.ObjectID `json:"brewID"`
	History []KegInfo           `json:"history"`
}

// KegPurchase -- do i care about the ID? (need better name)
type KegPurchase struct {
	KegID     primitive.ObjectID `json:"kegid"`
	Contents  string             `json:"contents"`
	TimeStamp time.Time          `json:"timestamp"`
}

// Customer ...how much information should be included here
type Customer struct {
	Name  string             `json:"name"`
	Email string             `json:"email"`
	Kegs  []KegPurchase      `json:"kegs"`
	ID    primitive.ObjectID `json:"id" bson:"_id"`
	//phone #
}

// Transaction ...
type Transaction struct {
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	CustomerID primitive.ObjectID `json:"customerID"`
	KegID      primitive.ObjectID `json:"kegID"`
	BrewID     primitive.ObjectID `json:"brewID"`
	Created    time.Time          `json:"created"`
	Type       string             `json:"type"`
}

// Brew ...
type Brew struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`
	Name        string             `json:"name"`
	Style       string             `json:"style"`
	ABV         float32            `json:"abv"`
	IBU         int                `json:"ibu"`
	Description string             `json:"description"`
	Notes       string             `json:"notes"`
	BrewDate    time.Time          `json:"brewDate"`
}
