import express from "express";

import {
  celulaId,
  createCelula,
  editCelula,
  getCelulas,
  getFromResponsavel,
  getParticipa,
} from "../controllers/celula.controller.js";

const celulaRouter = express.Router();

celulaRouter.get("/", getCelulas);
celulaRouter.get("/api/participa", getParticipa);
celulaRouter.get("/api/responsavel", getFromResponsavel);
celulaRouter.get("/api/:id", celulaId);

celulaRouter.post("/criar", createCelula);

celulaRouter.put("/api/:id", editCelula);

export default celulaRouter;
