import client from "./postgres.js";

export default class Student {
  static async createStudent(data) {
    // TODO: checar se não tem email
    try {
      await client.query(
        "INSERT INTO aluno(matricula, nome, email, senha) VALUES($1, $2, $3, $4)",
        //$1-------------$2---------$3----------$4--------
        [data.matricula, data.nome, data.email, data.senha],
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  static async deleteStudent(data) {
    try {
      if (data.matricula) {
        await client.query(
          "DELETE FROM aluno WHERE nome = $1",
          //$1-----------
          [data.nome],
        );
        return true;
      } else if (data.nome) {
        await client.query(
          "DELETE FROM aluno WHERE matricula = $1",
          //$1-----------
          [data.matricula],
        );
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
}
