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
	tc        *controllers.TransactionController
	kc        *controllers.KegController
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

	app.tc = controllers.NewTransactionController(app.database.Collection("transactions"))

	app.kc = controllers.NewKegController(app.database.Collection("kegs"))

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
