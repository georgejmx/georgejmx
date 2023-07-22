import express, { Application } from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import https, { Server as httpsServer } from "https";
import http, { Server as httpServer } from "http";
import { htmlRouter, apiRouter, priviligedRouter, authRouter } from "./router.js";
import { notFoundMiddleware, validateTokenMiddleware } from "./middleware.js";

export const app: Application = express();

// Serving frontent files and loading templating engine, body parser
dotenv.config({ path: path.dirname(".") + "/.env" });
app.use(express.static("frontend/dist"));
app.set("view engine", "hbs");
app.use(bodyParser.json());

// Connecting our routes
app.get("/health", (_, res) => {
    res.status(200).send("Healthy");
});
app.use("/api", apiRouter);
app.use("/html", htmlRouter);
app.use("/auth", authRouter);
app.use("/priviliged", priviligedRouter);

app.use(notFoundMiddleware);

// Launching the desired web service from node runtime
const serverType: string = process.env.PROTOCOL || "https";
if (serverType === "http") {
    if (process.env.NODE_ENV !== "test") {
        const server: httpServer = new http.Server(app);
        server.listen(3000, () => {
            console.log("http server is up on port 3000");
        });
    }
} else if (serverType === "https") {
    const server: httpServer = new https.Server(
        {
            cert: fs.readFileSync(process.env.SSL_PUBLIC_PATH || ""),
            key: fs.readFileSync(process.env.SSL_PRIVATE_PATH || ""),
        },
        app
    );
    server.listen(3000, () => {
        console.log("https server is up on internal port 3000");
    });
} else {
    console.error("invalid command line argument passed to runtime");
    process.abort();
}
