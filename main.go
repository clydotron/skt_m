package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"gopkg.in/mgo.v2/bson"
)

type applicationX struct {
	dbContext context.Context
	dbClient  *mongo.Client
	database  *mongo.Database
}

//   SLJaApkRw8C8GVXA
//var collection *mongo.Collection
var ctx = context.TODO()

func init() {

	uri := "mongodb+srv://dbUser:SLJaApkRw8C8GVXA@clusterx.aujay.mongodb.net/skt>?retryWrites=true&w=majority"

	fmt.Println("init - connecting")
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("connected.")

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)
	//collection = client.Database("tasker").Collection("tasks")

	db := client.Database("skt")
	if db == nil {
		log.Fatal("no db")
	}
	collections, err := db.ListCollections(ctx, bson.M{}) //.forEach( function(collection) { fmt.Println(collection);
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(collections)

}

func (app *applicationX) connectToMongo() error {

	uri := "mongodb+srv://dbUser:SLJaApkRw8C8GVXA@clusterx.aujay.mongodb.net/skt>?retryWrites=true&w=majority"
	fmt.Println("connecting to mongo...")

	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	if err != nil {
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		return err
	}
	// do we want to ping to confirm?
	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		return err
	}

	app.dbContext = ctx
	app.dbClient = client
	app.database = client.Database("skt")

	fmt.Println("Connected to MongoDB")

	return nil
}

func (app *applicationX) disconnectDB() {
	err := app.dbClient.Disconnect(app.dbContext)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("disconnected")
}

func main() {

	fmt.Println("weeee")
	// app := applicationX{}

	// err := app.connectToMongo()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer app.disconnectDB()

	// fmt.Println("requesting DB names")
	// databases, err := app.dbClient.ListDatabaseNames(context.TODO(), bson.M{})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(databases)
}
