import express from "express";

import { cadastroUsuario, loginUsuario } from "../controllers/usuario.controller.js";

const usuarioRouter = express.Router();

usuarioRouter.post('/cadastro', cadastroUsuario);
usuarioRouter.post('/login', loginUsuario);

export default usuarioRouter;
