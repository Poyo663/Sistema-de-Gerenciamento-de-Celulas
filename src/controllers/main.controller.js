import pug from "pug";
import { Celula } from "../models/celula.model.js";

const mainPageFunction = pug.compileFile("./src/views/index.pug");

export async function mainPage(req, res) {
  res.redirect("/html/paginaCelula.html");
  // const { rows } = await Celula.findCelula();
  // console.log(req.authenticated);
  // res.send(
  //   mainPageFunction({
  //     logged: req.authenticated,
  //     rows,
  //   }),
  // );
}
