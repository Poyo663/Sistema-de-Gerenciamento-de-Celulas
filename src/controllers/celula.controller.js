import pug from "pug";
import { Celula } from "../models/celula.model.js";

const celulaPageFunction = pug.compileFile("./src/views/celula.pug");

export async function getCelulas(req, res) {
  const { rows } = await Celula.findCelula();
  if (rows) res.send(rows);
  else res.send({});
}

export async function celulaPage(req, res) {
  const { rows } = await Celula.findCelula(Math.floor(Number(req.params.id)));
  res.send(celulaPageFunction({ celula: rows[0] }));
}
