import express from "express";

import { celulaPage, getCelulas } from "../controllers/celula.controller.js";

const celulaRouter = express.Router();

celulaRouter.get("/", getCelulas);
celulaRouter.get("/:id", celulaPage);

export default celulaRouter;
