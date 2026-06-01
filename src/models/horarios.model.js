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
