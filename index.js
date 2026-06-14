import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

import client from "./src/models/postgres.js";
import Authenticate from "./src/middleware/autheticate.middleware.js";
import { mainPage } from "./src/controllers/main.controller.js";
import celulaRouter from "./src/routers/celula.router.js";
import usuarioRouter from "./src/routers/usuario.router.js";

await client.connect();
const app = express();
const port = process.env.PORT;
const privateKey = fs.readFileSync("ca.key");
const certificate = fs.readFileSync("ca.crt");
const credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: process.env.CERT_PASSWORD,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(Authenticate);
app.use(express.static(path.join(path.dirname("."), "public")));
app.use((req, res, next) => {
  console.log(req.cookies);
  console.log("Req body " + req.body);
  next();
});

app.get("/", mainPage);
app.use("/celula", celulaRouter);
app.use("/usuario", usuarioRouter);

const httpsServer = https.createServer(credentials, app);
console.log(`listening at port ${port}`);
httpsServer.listen(port);
