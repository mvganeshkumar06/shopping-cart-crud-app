import express from "express";
import bodyParser from "body-parser";
import { executeQuery } from "./execute.js";

const app = express();
const port = PROCESS.env.PORT || 5000;
app.use(bodyParser.json());

// Listen to requests from the port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Middleware to handle cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  next();
});

// Listen for post request
app.post("/backend", (req, res) => {
  executeQuery(req.body.query).then((result) => {
    // console.log("the result object is ", result);
    res.send(JSON.stringify({ result }));
  });
});

// Closing the database connection
// connection.end();
