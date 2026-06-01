import client from "./postgres.js";

export class Horarios {
  static async findHorarios(id_celula) {
    try {
      const { rows, fields, rowCount } = await client.query(
        "SELECT * FROM celula_horarios WHERE id_celula = $1",
        [id_celula],
      );
      return { rows, fields, rowCount };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  static async deleteHorarios(id_celula) {
    try {
      await client.query("DELETE FROM celula_horarios WHERE id_celula = $1", [
        id_celula,
      ]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async editHorarios(id_celula, newHorario) {
    try {
      await client.query(
        "UPDATE celula_horarios SET horario = $1 WHERE id_celula = $2",
        [newHorario, id_celula],
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export class HorariosBuilder {
  constructor(id_celula, horario) {
    this.fields = new Map();
    this.fields.set("id_celula", id_celula);
    this.fields.set("horario", horario);
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
        `INSERT INTO celula_horarios(${fields}) VALUES(${fieldValues})`,
        values,
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
