import client from "./postgres.js";

export class Frequencia {
  static async findFrequencia(id_celula, semestre) {
    try {
      const { rows, fields, rowCount } = await client.query(
        "SELECT * FROM frequencia WHERE id_celula = $1 AND semestre = $2 ORDER BY data;",
        [id_celula, semestre],
      );
      return { rows, fields, rowCount };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
}

export class FrequenciaBuilder {
  constructor(obj) {
    if (!obj.idcelula) throw new Error("Campo 'idcelula' está vazio");
    if (!obj.semestre) throw new Error("Campo 'semestre' está vazio");
    if (!obj.matricula) throw new Error("Campo 'matricula' está vazio");
    if (!obj.data) throw new Error("Campo 'data' está vazio");

    this.fields = new Map();
    this.fields.set("id_celula", obj.idcelula);
    this.fields.set("semestre", obj.semestre);
    this.fields.set("matricula", obj.matricula);
    this.fields.set("data", obj.data);
    if (obj.presente) this.fields.set("presente", obj.presente);
    else this.fields.set("presente", false);
  }

  setPresente(presente) {
    this.fields.set("presente", presente);
    return this;
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
        `INSERT INTO frequencia(${fields}) VALUES(${fieldValues})`,
        values,
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
