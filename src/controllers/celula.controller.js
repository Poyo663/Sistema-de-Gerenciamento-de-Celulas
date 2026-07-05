import path from "path";
import jwt from "jsonwebtoken";
import "dotenv/config";
import pug from "pug";

import { Celula, CelulaBuilder } from "../models/celula.model.js";
import { fileURLToPath } from "url";
import { Participa } from "../models/participa.relation.model.js";

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

export async function getParticipa(req, res) {
  if (req.authenticated) {
    // console.log(req.cookies);
    const payload = jwt.verify(
      req.cookies.auth_token,
      process.env.CRYPTOSECRET,
    );
    const { rows } = await Participa.findParticipa(payload.matricula);
    res.json(rows);
  } else {
    res.json([]);
  }
}

export async function getFromResponsavel(req, res) {
  if (req.authenticated) {
    if (process.env.NODE_ENV === "production") {
      console.log(req.cookies);
      const payload = jwt.verify(
        req.cookies.auth_token,
        process.env.CRYPTOSECRET,
      );
      const { rows } = await Celula.findCelulaByResponsible(req.cookies.nome);
      res.json(rows);
    } else {
      const { rows } = await Celula.findCelulaByResponsible("Emery Botsford");
      res.json(rows);
    }
  } else {
    res.json([]);
  }
}

export async function editCelula(req, res) {
  if (req.authenticated) {
    if (!req.body.nome || !req.body.responsavel) res.send(400);
    else {
      const id = Number(req.params.id);
      const celula = new CelulaBuilder(req.body.nome, req.body.responsavel);
      if (req.body.orientador) celula.setOrientador(req.body.orientador);
      if (req.body.horas) celula.setHoras(req.body.horas);
      if (req.body.descricao) celula.setDescricao(req.body.descricao);
      if (req.body.requisitos) celula.setPreRequisitos(req.body.requisitos);
      if (req.body.orientador) celula.setOrientador(req.body.orientador);
      const result = await celula.edit(id);
      if (result) res.send(200);
      else res.send(404);
    }
  } else {
    res.send(401);
  }
}
