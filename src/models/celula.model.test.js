const { faker } = require("@faker-js/faker");

import client from "./postgres.js";
import { Celula, CelulaBuilder } from "./celula.model.js";

const data = [];
const len = 30;
for (let i = 0; i < len; i++) {
  data.push({
    nome: faker.company.name(),
    descricao: faker.lorem.sentence(),
    locais: faker.lorem.sentence(),
    horas: faker.number.int(),
    responsavel: faker.person.fullName(),
    orientador: faker.person.fullName(),
    prerequisitos: faker.lorem.sentence(),
  });
}

beforeAll(async () => {
  return await client.connect();
});

afterAll(async () => {
  return await client.end();
});

describe("Testando criacao", () => {
  afterEach(async () => {
    return await client.query("DELETE FROM celula");
  });

  test("Criar com apenas nome e responsavel", async () => {
    expect(
      await new CelulaBuilder(data[0].nome, data[0].responsavel).build(),
    ).toBeTruthy();
  });

  test("Criar com descricao", async () => {
    expect(
      await new CelulaBuilder(data[0].nome, data[0].responsavel)
        .setDescricao(data[0].descricao)
        .build(),
    ).toBeTruthy();
  });

  test("Criar com locais", async () => {
    expect(
      await new CelulaBuilder(data[0].nome, data[0].responsavel)
        .setLocais(data[0].locais)
        .build(),
    ).toBeTruthy();
  });

  test("Criar com orientador", async () => {
    expect(
      await new CelulaBuilder(data[0].nome, data[0].responsavel)
        .setOrientador(data[0].orientador)
        .build(),
    ).toBeTruthy();
  });

  test("Criar com pre-requisitos", async () => {
    expect(
      await new CelulaBuilder(data[0].nome, data[0].responsavel)
        .setPreRequisitos(data[0].prerequisitos)
        .build(),
    ).toBeTruthy();
  });

  test("Criar com todos", async () => {
    expect(
      await new CelulaBuilder(data[0].nome, data[0].responsavel)
        .setDescricao(data[0].descricao)
        .setLocais(data[0].locais)
        .setOrientador(data[0].orientador)
        .setPreRequisitos(data[0].prerequisitos)
        .build(),
    ).toBeTruthy();
  });
});

// test("Can the database delete a celula?", async () => {
//   expect(await Celula.deleteCelula(data)).toBeTruthy();
// });

describe("Selecao de celulas", () => {
  beforeAll(async () => {
    for (let i = 0; i < len; i++) {
      await new CelulaBuilder(data[i].nome, data[i].responsavel)
        .setDescricao(data[i].descricao)
        .setLocais(data[i].locais)
        .setOrientador(data[i].orientador)
        .setPreRequisitos(data[i].prerequisitos)
        .build();
    }
  });

  afterAll(async () => {
    return await client.query("DELETE FROM celula");
  });

  test("Achar pelo nome", async () => {
    expect(await Celula.findCelula(data[0].nome.slice(0, -5))).toBeTruthy();
  });
});
