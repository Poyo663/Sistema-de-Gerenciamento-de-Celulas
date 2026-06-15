import path from "path";

import pug from "pug";
import { Celula, CelulaBuilder } from "../models/celula.model.js";
import { fileURLToPath } from "url";

const celulaPageFunction = pug.compileFile("./src/views/celula.pug");

export async function getCelulas(req, res) {
  const { rows } = await Celula.findCelula();
  if (rows) res.send(rows);
  else res.send({});
}

export async function celulaPage(req, res) {
  res.sendFile(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../public/html/detalhesCelula.html",
    ),
  );
}

export async function celulaId(req, res) {
  const id = Number(req.params.id);
  const c = await Celula.findCelula(Math.floor(Number(req.params.id)));
  if (c) {
    for (let i = 0; i < c.rows.length; i++) {
      if (c.rows[i].id === id) res.send(c.rows[i]);
    }
  } else {
    res.send({});
  }
}

export async function createCelula(req, res) {
  //TODO: Adicionar verificacao para ver se tem um usuario com o mesmo nome que o responsavel
  if (req.authenticated) {
    try {
      const newCelula = new CelulaBuilder(req.body.nome, req.body.responsavel);
      if (req.body.descricao) newCelula.setDescricao(req.body.descricao);
      if (req.body.horas) newCelula.setHoras(Number(req.body.horas));
      if (req.body.orientador) newCelula.setOrientador(req.body.orientador);
      if (req.body.prerequisitos)
        newCelula.setPreRequisitos(req.body.prerequisitos);
      await newCelula.build();

      res.send("Celula criada");
    } catch (error) {
      console.log(error);
      res.send("Nao foi possivel criar a celula");
    }
  } else res.redirect("/html/paginaLogin.html");
}
