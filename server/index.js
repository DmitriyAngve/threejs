import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import dalleRoutes from "./routes/dalle.routes.js";

// Set up the enviroment variables
dotenv.config();

// Set up the express application
const app = express();
// Set up needed middleware by calling the app.use command
app.use(cors()); // avoid cross-origins problems
app.use(express.json({ limit: "50mb" })); // specify the weight of the payload that we can send - limit is going to be 50mb

app.use("/api/v1/dalle", dalleRoutes); // use dalle routes or consume them as a middleware

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" });
}); // demo route by saying app.get

app.listen(8080, () => console.log("Server has started on port 8080")); // listen on a specific port
