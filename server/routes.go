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
	//config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"localhost:3000"}
	// router.Use(cors.New(config))

	// config := cors.DefaultConfig()
	// config.AddAllowHeaders("*")
	// config.AllowAllOrigins = true
	// config.AllowMethods = []string{"POST", "GET", "DELETE", "PATCH"}
	// router.Use(cors.New(config))

	v1 := router.Group("/api/v1")

	router.GET("/", showRoot)

	// customers:
	router.GET("/api/v1/customers", app.cc.GetAllCustomers)
	router.POST("/api/v1/customers", app.cc.CreateCustomer)
	router.GET("/api/v1/customers/:id", app.cc.GetCustomer)
	router.PATCH("/api/v1/customers/:id", app.cc.UpdateCustomer)
	router.DELETE("/api/v1/customers/:id", app.cc.DeleteCustomer)

	v1.POST("/customers/:id/*action", app.cc.KegTransaction)

	// Kegs:

	// Transactions:

	// Brews:

	//api := router.Group("/api")
	//v1 := api.Group("v1")
	//cg := router.Group("/api/v1/customers")
	{
		//cg.GET("/", app.cc.GetAllCustomers)
		// cg.GET("/:id", app.cc.GetCustomer)
		// cg.PATCH("/:id", app.cc.UpdateCustomer)
		// cg.POST("/", app.cc.CreateCustomer)
		// cg.DELETE("/:id", app.cc.DeleteCustomer)
		//cg.POST("/purchase/:id", app.cc.PurchaseKeg)
		//cg.POST("/return/:id", app.cc.ReturnKeg)
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

	//kg := router.Group("/api/v1/keg")
	{
		v1.GET("/kegs", app.kc.GetAllKegs)
		v1.POST("/kegs", app.kc.CreateKeg)
		v1.GET("/kegs/:id", app.kc.GetKeg)
		v1.POST("/kegs/:id/*action", app.kc.HandleKegAction)
		v1.DELETE("/kegs/:id", app.kc.DeleteKeg)
	}
	//router.GET("/api/v1/kegs", app.kc.GetAllKegs)

	router.Run()
}
