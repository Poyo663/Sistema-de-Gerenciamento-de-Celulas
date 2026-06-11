import express from "express";

import { celulaPage } from "../controllers/celula.controller.js";

const celulaRouter = express.Router();

celulaRouter.get("/:id", celulaPage);

export default celulaRouter;
