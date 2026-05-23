import client from "./postgres";

export class Celula {
  // TODO: adicionar selecao e teste de selecao
  static async deleteCelula(id) {
    try {
      if (id) {
        await client.query(
          "DELETE FROM celula WHERE id = $1",
          //$1-----------
          [id],
        );
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  static async findCelula(identifier) {
    try {
      if (typeof identifier === "number") {
        const { rows, fields, rowCount } = client.query(
          "SELECT * FROM celula WHERE id = $1;",
          [identifier],
        );
        return { rows, fields, rowCount };
      } else if (typeof identifier === "string") {
        const { rows, fields, rowCount } = client.query(
          "SELECT * FROM celula ORDER BY nome <-> $1;",
          [identifier],
        );
        return { rows, fields, rowCount };
      }
      else return {};
    } catch (err) {
      console.error(err);
      return {};
    }
  }
}

export class CelulaBuilder {
  constructor(nome, responsavel) {
    this.fields = new Map();
    this.fields.set("nome", nome);
    this.fields.set("responsavel", responsavel);
  }

  setDescricao(descricao) {
    this.fields.set("descricao", descricao);
    return this;
  }

  setLocais(locais) {
    this.fields.set("locais", locais);
    return this;
  }

  setHoras(horas) {
    this.fields.set("horas", horas);
    return this;
  }

  setOrientador(orientador) {
    this.fields.set("orientador", orientador);
    return this;
  }

  setPreRequisitos(prerequisitos) {
    this.fields.set("pre_requisitos", prerequisitos);
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
        `INSERT INTO celula(${fields}) VALUES(${fieldValues})`,
        values,
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
