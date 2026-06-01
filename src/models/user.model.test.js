import client from "./postgres.js";
import Student from "./user.model.js";

beforeAll(async () => {
  return await client.connect();
});

beforeAll(async () => {
  return await client.query('DELETE FROM aluno');
});

afterAll(async () => {
  return await client.end();
});

test("Can the database create a user?", async () => {
  expect(
    await Student.createStudent({
      matricula: "564597",
      nome: "Anna de Azevedo Maciel",
      email: "jeffersondeazevedomaciel@gmail.com",
      senha: "password",
    }),
  ).toBeTruthy();
});

test("Can the database delete a user?", async () => {
  expect(
    await Student.deleteStudent({
      matricula: "564597",
      nome: "Anna de Azevedo Maciel",
      email: "jeffersondeazevedomaciel@gmail.com",
      senha: "password",
    }),
  ).toBeTruthy();
});
