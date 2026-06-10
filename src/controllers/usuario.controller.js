import jwt from "jsonwebtoken";
import "dotenv/config";

import Student from "../models/user.model.js";

const tokenTime = 60 * 60 * 24;

export async function cadastroUsuario(req, res) {
  // console.log(req.body);
  // console.log(req.cookies);
  const result = await Student.createStudent({
    nome: req.body.nome,
    matricula: req.body.matricula,
    email: req.body.email,
    senha: req.body.senha,
  });
  if (result) {
    const jwtoken = jwt.sign(
      {
        matricula: req.body.matricula,
        senha: req.body.senha,
      },
      process.env.CRYPTOSECRET,
      { expiresIn: tokenTime },
    );
    res.cookie("auth_token", jwtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: tokenTime,
    });
    res.status(201);
    res.redirect("/");
  } else {
    res.send(400);
  }
}
