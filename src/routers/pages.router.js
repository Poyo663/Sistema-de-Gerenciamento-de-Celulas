import express from "express";

import { createPageRoute } from "../controllers/pages.controller.js";

const pagesRouter = express.Router();

pagesRouter.get("/login", createPageRoute("paginaLogin.html"));
pagesRouter.get("/cadastro", createPageRoute("loadSignUpPage"));

pagesRouter.use("/", (req, res, next) => {
  if (req.authenticated) {
    next();
  } else {
    res.redirect("/pages/login");
  }
});

pagesRouter.get("/detalhes", createPageRoute("detalhesCelula.html"));
pagesRouter.get("/celula", createPageRoute("paginaCelula.html"));
pagesRouter.get("/home", createPageRoute("paginaHome.html"));
pagesRouter.get("/senha", createPageRoute("paginaRecuperarSenha.html"));

export default pagesRouter;
