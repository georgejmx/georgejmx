import express, { Application } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import https, { Server as httpsServer } from "https";
import http, { Server as httpServer } from "http";
import { apiRouter } from "./apiRoutes.js";
import { htmlRouter } from "./htmlRoutes.js";

const app: Application = express();

// Serving frontent files and loading templating engine, body parser
const __filename: string = fileURLToPath(import.meta.url);
dotenv.config({ path: path.dirname(".") + "/.env" });
app.use(
  express.static(path.join(path.dirname(__filename), "./../frontend/dist"))
);
app.set("view engine", "hbs");
app.use(bodyParser.json());

// Connecting our routes
app.use("/api", apiRouter);
app.use("/html", htmlRouter);

// Launching the desired web service from node runtime
const serverType: string = process.env.PROTOCOL || "https";
if (serverType === "http") {
  const server: httpServer = new http.Server(app);
  server.listen(3000, () => {
    console.log("http server is up on port 3000");
  });
} else if (serverType === "https") {
  const server: httpServer = new https.Server(
    {
      cert: fs.readFileSync("./cert/live/georgejmx.dev/fullchain.pem"),
      key: fs.readFileSync("./cert/live/georgejmx.dev/privkey.pem"),
    },
    app
  );
  server.listen(3000, () => {
    console.log("https server is up on port 3000");
  });
} else {
  console.log("invalid command line argument passed to runtime");
  process.abort();
}
