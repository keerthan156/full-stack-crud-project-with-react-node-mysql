//importing express, environmental variables, bodyparser, router, database connection function and declaring them in a varibale to be using it in our index.js file
const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./db/ConnectDB');
const app = express();
const router = require('./routes/DBOperRoutes');
const bodyParser = require('body-parser');
const cors = require("cors")
dotenv.config();
//using the port in environmental variable or 3000
const port = process.env.PORT || 3000;

// middleware to parse incoming request in bodies
app.use(express.json()); // Use built-in express middleware for JSON parsing
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// initialize the database connection pool
let pool;

(async () => {
    try {
        pool = await ConnectDB();

        // pass the pool to the routes
        app.use((req, res, next) => {
            req.pool = pool;
            next();
        });

        // use the router
        app.use("/", router);

        // start the server
        app.listen(port, () => {
            console.log(`Example app listening on port http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); // Exit with a failure code
    }
})();
