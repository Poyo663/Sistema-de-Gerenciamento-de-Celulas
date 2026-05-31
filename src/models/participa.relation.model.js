import client from "./postgres.js";

export class Participa {
  static async findParticipantes(id_celula) {
    try {
      const { rows, fields, rowCount } = await client.query(
        "SELECT aluno.* FROM participa INNER JOIN aluno " +
        "ON participa.matricula = aluno.matricula " +
        "WHERE participa.id_celula = $1 ORDER BY aluno.nome",
        [id_celula],
      );
      return { rows, fields, rowCount };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  static async findParticipa(matricula) {
    try {
      const { rows, fields, rowCount } = await client.query(
        "SELECT celula.* FROM participa INNER JOIN celula " +
        "ON participa.id_celula = celula.id " +
        "WHERE participa.matricula = $1 ORDER BY celula.nome",
        [matricula.toString()],
      );
      return { rows, fields, rowCount };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  static async deleteParticipante(id_celula, matricula) {
    try {
      await client.query(
        "DELETE FROM participa WHERE id_celula = $1 AND matricula = $2",
        //$1-----------
        [id_celula, matricula],
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}

export class ParticipaBuilder {
  constructor(id_celula, matricula) {
    this.fields = new Map();
    this.fields.set("id_celula", id_celula);
    this.fields.set("matricula", matricula);
  }

  async build() {
    let fields = "";
    let fieldValues = "";
    let i = 1;
    const values = [];
    const keys = this.fields.keys();
    let current = keys.next();
    while (!current.done) {
      fields += current.value + ",";
      fieldValues += "$" + i + ",";
      values.push(this.fields.get(current.value));
      i++;
      current = keys.next();
    }
    // removing the ',' at the end
    fields = fields.slice(0, -1);
    fieldValues = fieldValues.slice(0, -1);

    try {
      await client.query(
        `INSERT INTO participa(${fields}) VALUES(${fieldValues})`,
        values,
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
