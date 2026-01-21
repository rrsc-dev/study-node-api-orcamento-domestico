create table contas
(
    id         serial
        primary key,
    nome       varchar(100) not null,
    created_at timestamp default CURRENT_TIMESTAMP,
    saldo      numeric,
    ativo      boolean
);

CREATE TABLE operacoes (
    id SERIAL PRIMARY KEY,
    tipo INT,
    data TIMESTAMP,
    valor NUMERIC,
    conta_id INT NOT NULL,
    status INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_operacoes_contas
        FOREIGN KEY (conta_id)
        REFERENCES contas (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    uso INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subcategorias (
    id SERIAL PRIMARY KEY,
    categoria_id INT NOT NULL,
    nome_subcategoria VARCHAR(100) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_subcategorias_categorias
        FOREIGN KEY (categoria_id)
        REFERENCES categorias (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

ALTER TABLE operacoes
ADD COLUMN categoria_id INT,
ADD COLUMN subcategoria_id INT;

ALTER TABLE operacoes
ADD CONSTRAINT fk_operacoes_categoria
    FOREIGN KEY (categoria_id)
    REFERENCES categorias (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;

ALTER TABLE operacoes
ADD CONSTRAINT fk_operacoes_subcategoria
    FOREIGN KEY (subcategoria_id)
    REFERENCES subcategorias (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;

ALTER TABLE operacoes
ADD COLUMN conta_destino_id INT

ALTER TABLE operacoes
ADD COLUMN descricao VARCHAR(255)

ALTER TABLE operacoes
ADD COLUMN local VARCHAR(255)