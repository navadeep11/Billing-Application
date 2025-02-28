const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const dbConnect = require("./Config/DbConnect");
const cors = require("cors");
const Router = require("./Routes/Routers");

// Constants
const port = process.env.PORT || 3000;


// Initialization of server
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));  // Adjust size as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
};
  
app.use(cors(corsOptions));
  
// Database connection
dbConnect();

// Routes

app.use("/",Router);
  

// Start server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
