import jwt from "jsonwebtoken";
import "dotenv/config";

import Student from "../models/user.model.js";

export default async function Authenticate(req, res, next) {
  try {
    const payload = jwt.verify(
      req.cookies.auth_token,
      process.env.CRYPTOSECRET,
    );
    const s = await Student.findStudent({ matricula: payload.matricula });
    // if(s.rows[0].senha === payload.senha)
    //   req.autheticated = true;
    // else
    //   throw new Error();
    req.authenticated = true;
    res.cookie("authenticated", true);
    res.cookie("nome", s.rows[0].nome);
    next();
  } catch (error) {
    req.authenticated = false;
    res.cookie("authenticated", false);
    next();
  } finally {
    // console.log("request " + req.autheticated);
  }
}
