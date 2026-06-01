import { faker } from "@faker-js/faker";

import client from "./postgres.js";
import Student from "./user.model.js";
import { Celula, CelulaBuilder } from "./celula.model.js";
import { Frequencia, FrequenciaBuilder } from "./frequencia.model.js";

const celulas = [];
const len = 1;
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

const estudantes = [];
for (let i = 0; i < len; i++) {
  const matricula = Math.floor(Math.random() * 8999 + 1000).toString();
  estudantes.push({
    matricula: matricula,
    nome: faker.company.name(),
    email: faker.internet.email(),
    senha: faker.internet.password({ length: 28 }),
  });
}

beforeAll(async () => {
  await client.connect();
  for (let i = 0; i < len; i++) {
    await Student.createStudent(estudantes[i]);
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
  await client.query("DELETE FROM aluno");
  await client.query("DELETE FROM frequencia");
  await client.end();
});

test("Criar frequências para uma célula", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect(
    await new FrequenciaBuilder({
      idcelula: c.rows[0].id,
      semestre: "2026.1",
      matricula: estudantes[0].matricula,
      data: "2026-03-04",
    }).build(),
  ).toBeTruthy();
});

test("Procurar por frequências de uma célula e um semestre", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect(
    (await Frequencia.findFrequencia(c.rows[0].id, "2026.1")).rows,
  ).toBeTruthy();
});
