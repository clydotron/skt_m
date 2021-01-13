package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/clydotron/skt_mongo/controllers"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type applicationX struct {
	dbContext context.Context
	dbClient  *mongo.Client
	database  *mongo.Database
	cc        *controllers.CustomerController
}

//var collection *mongo.Collection
var ctx = context.TODO()

func init() {

	// uri := os.Getenv("MONGODB_URI")
	// //fmt.Println("URI:", uri)

	// fmt.Println("init - connecting")
	// clientOptions := options.Client().ApplyURI(uri)
	// client, err := mongo.Connect(ctx, clientOptions)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// err = client.Ping(ctx, nil)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Println("connected.")

	// databases, err := client.ListDatabaseNames(ctx, bson.M{})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(databases)
	// //collection = client.Database("tasker").Collection("tasks")

	// db := client.Database("skt")
	// if db == nil {
	// 	log.Fatal("no db")
	// }
	// collections, err := db.ListCollections(ctx, bson.M{}) //.forEach( function(collection) { fmt.Println(collection);
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(collections)

}

func (app *applicationX) connectToMongo() error {

	uri := os.Getenv("MONGODB_URI")
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

	// this doesnt work: docs say you can pass
	// filter := bson.D{}
	// cnames, err := app.database.ListCollectionNames(ctx, filter)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// for _, name := range cnames {
	// 	fmt.Println(name)
	// }

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

func (app *applicationX) initControllers() error {

	app.cc = controllers.NewCustomerController(app.database.Collection("customers"))

	return nil
}

func main() {

	fmt.Println("starting up...")

	app := applicationX{}

	// connect to the database
	app.connectToMongo()
	defer app.disconnectDB()

	app.initControllers()

	app.initRoutes()

}

/*

  import "go.mongodb.org/mongo-driver/mongo"

  ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
  defer cancel()
  client, err := mongo.Connect(ctx, options.Client().ApplyURI(

  ))
  if err != nil { log.Fatal(err) }


*/
