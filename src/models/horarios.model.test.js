import { faker } from "@faker-js/faker";

import client from "./postgres.js";
import { Celula, CelulaBuilder } from "./celula.model.js";
import { Horarios, HorariosBuilder } from "./horarios.model.js";

const celulas = [];
const len = 2;
for (let i = 0; i < len; i++) {
  celulas.push({
    nome: faker.company.name(),
    descricao: faker.lorem.sentence(),
    locais: faker.lorem.sentence(),
    horas: faker.number.int(10),
    responsavel: faker.person.fullName(),
    orientador: faker.person.fullName(),
    prerequisitos: faker.lorem.sentence(),
  });
}

beforeAll(async () => {
  await client.connect();
  for (let i = 0; i < len; i++) {
    await new CelulaBuilder(celulas[i].nome, celulas[i].responsavel)
      .setDescricao(celulas[i].descricao)
      .setHoras(celulas[i].horas)
      .setLocais(celulas[i].locais)
      .setOrientador(celulas[i].orientador)
      .setPreRequisitos(celulas[i].prerequisitos)
      .build();
  }
});

afterAll(async () => {
  await client.query("DELETE FROM celula");
  await client.query("DELETE FROM celula_horarios");
  await client.end();
});

test("Criando a relação", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect(
    await new HorariosBuilder(c.rows[0].id, "14:00 todos as quintas").build(),
  ).toBeTruthy();
});

test("Procurando horário da célula", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect((await Horarios.findHorarios(c.rows[0].id)).rows).toBeTruthy();
});

test("Editando horário da célula", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect(
    await Horarios.editHorarios(c.rows[0].id, "14:00 todos as quartas"),
  ).toBeTruthy();
});

test("Deletando horário da célula", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect(await Horarios.deleteHorarios(c.rows[0].id)).toBeTruthy();
});
