import express from "express";

import { celulaId, celulaPage, createCelula, getCelulas } from "../controllers/celula.controller.js";

const celulaRouter = express.Router();

celulaRouter.get("/", getCelulas);
celulaRouter.get("/:id", celulaPage);
celulaRouter.get("/api/:id", celulaId);

celulaRouter.post("/criar", createCelula);

export default celulaRouter;
