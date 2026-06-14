import express from "express";

import { celulaPage, createCelula, getCelulas } from "../controllers/celula.controller.js";

const celulaRouter = express.Router();

celulaRouter.get("/", getCelulas);
celulaRouter.get("/:id", celulaPage);

celulaRouter.post("/criar", createCelula);

export default celulaRouter;
