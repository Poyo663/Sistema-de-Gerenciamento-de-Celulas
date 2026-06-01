import { faker } from "@faker-js/faker";

import client from "./postgres.js";
import Student from "./user.model.js";
import { Celula, CelulaBuilder } from "./celula.model.js";
import { Participa, ParticipaBuilder } from "./participa.relation.model.js";

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
  await client.query("DELETE FROM participa");
  await client.end();
});

test("Criando a relação", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect(
    await new ParticipaBuilder(c.rows[0].id, estudantes[0].matricula).build(),
  ).toBeTruthy();
});

test("Procurando participantes pelo id da célula", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect((await Participa.findParticipantes(c.rows[0].id)).rows).toBeTruthy();
});

test("Procurando celulas pelo participante", async () => {
  expect(
    (await Participa.findParticipa(estudantes[0].matricula)).rows,
  ).toBeTruthy();
});

test("Um participante saindo de uma célula", async () => {
  const c = await Celula.findCelula(celulas[0].nome);
  expect(
    await Participa.deleteParticipante(c.rows[0].id, estudantes[0].matricula),
  ).toBeTruthy();
});
