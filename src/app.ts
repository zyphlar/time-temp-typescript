import express from "express";
import path from "path";
import bodyParser from "body-parser";

import * as homeController from "./controllers/home";
//import * as apiController from "./controllers/api";

const app = express();

app.set("port", process.env.PORT || 3000);
// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homeController.index);
app.post("/", homeController.index);
//app.get("/api", apiController.getApi);

export default app;
