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