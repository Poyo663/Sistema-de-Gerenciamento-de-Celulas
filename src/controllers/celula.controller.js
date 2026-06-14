import pug from "pug";
import { Celula, CelulaBuilder } from "../models/celula.model.js";

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
