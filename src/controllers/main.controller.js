import pug from "pug";
import { Celula, CelulaBuilder } from "../models/celula.model.js";
import { faker } from "@faker-js/faker";

const mainPageFunction = pug.compileFile("./src/views/index.pug");

export async function mainPage(req, res) {
  const { rows } = await Celula.findCelula();
  console.log(rows);
  res.send(
    mainPageFunction({
      logged: false,
      rows,
    }),
  );
}
