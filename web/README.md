# React app using Gin app

## CORS

You're encountering a CORS (Cross-Origin Resource Sharing) error, which is a security feature implemented by web browsers to prevent malicious scripts on one page from obtaining access to sensitive data on another page. When your React app (running on one port, say 3000) tries to fetch data from your Gin app (running on another port, 8080), the browser sees this as a cross-origin request.

To resolve this, you need to configure your Gin backend to handle CORS requests. Gin provides middleware to handle CORS requests, which you can configure to allow requests from your React app's origin. Here's an example of how you might set it up:

```
package main

import (
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "time"
)

func main() {
    router := gin.Default()

    // Configure CORS middleware
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"} // React app's server address
    config.AllowMethods = []string{"GET", "POST", "OPTIONS"}
    config.AllowHeaders = []string{"Origin", "Content-Type"}
    config.ExposeHeaders = []string{"Content-Length"}
    config.AllowCredentials = true
    config.MaxAge = 12 * time.Hour

    router.Use(cors.New(config))

    // Your routes here...

    router.Run(":8080")
}
```

or 

```
 router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3003"}, // Make sure this matches your React app's URL
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        AllowOriginFunc: func(origin string) bool {
            return origin == "http://localhost:3003"
        },
    }))
```

This middleware configuration tells Gin to allow CORS requests from http://localhost:3000 (where your React app is likely running) and to accept certain headers and methods.

With this in place, your React app should be able to communicate with your Gin backend without encountering CORS errors. Adjust the AllowOrigins, AllowMethods, and other configurations as needed for your specific setup.


* Install cors

>go get github.com/gin-contrib/cors

And now re-run the app.

* Reload React app in the browser and insure it displays "Hello, World!"

