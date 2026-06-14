import client from "./postgres.js";

export default class Student {
  static async createStudent(data) {
    // TODO: checar se não tem email
    try {
      if (data.email) {
        await client.query(
          "INSERT INTO aluno(matricula, nome, email, senha) VALUES($1, $2, $3, $4)",
          //$1-------------$2---------$3----------$4--------
          [data.matricula, data.nome, data.email, data.senha],
        );
      } else {
        await client.query(
          "INSERT INTO aluno(matricula, nome, senha) VALUES($1, $2, $4)",
          //$1-------------$2---------$3----------$4--------
          [data.matricula, data.nome, data.senha],
        );
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  static async deleteStudent(data) {
    try {
      if (data.nome) {
        await client.query(
          "DELETE FROM aluno WHERE nome = $1",
          //$1-----------
          [data.nome],
        );
        return true;
      } else if (data.matricula) {
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

  static async findStudent(data) {
    try {
      if (data.matricula) {
        const { rows, fields, rowCount } = await client.query(
          "SELECT * FROM aluno WHERE matricula = $1",
          //$1-----------
          [data.matricula],
        );
        return { rows, fields, rowCount };
        // } else if (data.nome) {
        //   await client.query(
        //     "DELETE FROM aluno WHERE matricula = $1",
        //     //$1-----------
        //     [data.matricula],
        //   );
        //   return true;
      } else if (data.email) {
        const { rows, fields, rowCount } = await client.query(
          "SELECT * FROM aluno WHERE email = $1",
          //$1-----------
          [data.email],
        );
        return { rows, fields, rowCount };
      } else return null;
    } catch (err) {
      return null;
    }
  }
}
