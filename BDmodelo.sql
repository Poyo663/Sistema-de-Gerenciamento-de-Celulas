CREATE TABLE aluno (
    matricula VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    senha VARCHAR(28) NOT NULL
);

CREATE TABLE celula (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    locais VARCHAR(100),
    horas INT,
    responsavel VARCHAR(100),
    orientador VARCHAR(100),
    pre_requisitos TEXT
);

CREATE TABLE celula_materiais (
    id_celula INT REFERENCES celula(id) ON DELETE CASCADE,
    material VARCHAR(100),
    PRIMARY KEY (id_celula, material)
);

CREATE TABLE celula_horarios (
    id_celula INT REFERENCES celula(id) ON DELETE CASCADE,
    horario VARCHAR(100),
    PRIMARY KEY (id_celula, horario)
);

CREATE TABLE participa (
    id_celula INT REFERENCES celula(id) ON DELETE CASCADE,
    matricula VARCHAR(50) REFERENCES aluno(matricula) ON DELETE CASCADE,
    PRIMARY KEY (id_celula, matricula)
);

CREATE TABLE frequencia (
    id SERIAL PRIMARY KEY,
    id_celula INT REFERENCES celula(id) ON DELETE CASCADE,
    matricula VARCHAR(50) REFERENCES aluno(matricula) ON DELETE CASCADE,
    semestre VARCHAR(20) NOT NULL,
    data DATE,
    presente BOOLEAN
);

CREATE TABLE frequenta (
    matricula VARCHAR(50) REFERENCES aluno(matricula) ON DELETE CASCADE,
    id_frequencia INT REFERENCES frequencia(id) ON DELETE CASCADE,
    PRIMARY KEY (matricula, id_frequencia)
);

ALTER TABLE frequencia ADD COLUMN matricula VARCHAR(50) REFERENCES aluno(matricula);
