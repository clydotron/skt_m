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
		cg.POST("/purchase/:id", app.cc.PurchaseKeg)
		cg.POST("/return/:id", app.cc.ReturnKeg)
		//cg.POST("/:id/*action", app.cc.KegTransaction)
	}

	tg := router.Group("/api/v1/transaction")
	{
		tg.POST("/", app.tc.CreateTransaction)
		tg.GET("/:id", app.tc.GetTransaction)
		//cg.POST("/purchase", app.tc.PurchaseKeg)
		//cg.POST("/return", app.tc.ReturnKeg)
		// add the remaining CRUD
	}
	router.GET("/api/v1/transactions", app.tc.GetAllTransactions)

	kg := router.Group("/api/v1/keg")
	{
		kg.POST("/", app.kc.CreateKeg)
		kg.GET("/:id", app.kc.GetKeg)
		kg.POST("/:id/*action", app.kc.HandleKegAction)
		//kg.GET("/index", app.kc.GetAllKegs)
		kg.DELETE("/:id", app.kc.DeleteKeg)

	}
	router.GET("/api/v1/kegs", app.kc.GetAllKegs)

	router.Run()
}
