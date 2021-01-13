package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func showRoot(c *gin.Context) {

	c.String(http.StatusOK, "all good")
}

func (app *applicationX) initRoutes() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./web", true)))
	router.Use(cors.Default()) // ?

	router.GET("/", showRoot)
	router.GET("/api/v1/customers", app.cc.GetAllCustomers)
	//api := router.Group("/api")
	//v1 := api.Group("v1")
	cg := router.Group("/api/v1/customer")
	{
		//cg.GET("/", app.cc.GetAllCustomers)
		cg.GET("/:id", app.cc.GetCustomer)
		cg.PATCH("/:id", app.cc.UpdateCustomer)
		cg.POST("/", app.cc.CreateCustomer)
		cg.DELETE("/:id", app.cc.DeleteCustomer)
	}

	router.Run()
}
