import pool from "./db";

const seed = async () => {
  const client = await pool.connect();
  try {
    console.log("🌱 Iniciando Seed do Banco de Dados...");

    // 1. Limpar tabelas existentes (Ordem reversa por causa das FKs)
    await client.query("DROP TABLE IF EXISTS operacoes CASCADE");
    await client.query("DROP TABLE IF EXISTS subcategorias CASCADE");
    await client.query("DROP TABLE IF EXISTS categorias CASCADE");
    await client.query("DROP TABLE IF EXISTS contas CASCADE");

    // 2. Criar Tabela Contas
    await client.query(`
            CREATE TABLE contas (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                saldo NUMERIC,
                ativo BOOLEAN
            );
        `);

    // 3. Criar Tabela Categorias
    await client.query(`
            CREATE TABLE categorias (
                id SERIAL PRIMARY KEY,
                nome_categoria VARCHAR(100) NOT NULL,
                status BOOLEAN NOT NULL DEFAULT TRUE,
                uso INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // 4. Criar Tabela Subcategorias
    await client.query(`
            CREATE TABLE subcategorias (
                id SERIAL PRIMARY KEY,
                categoria_id INT NOT NULL,
                nome_subcategoria VARCHAR(100) NOT NULL,
                status BOOLEAN NOT NULL DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_subcategorias_categorias FOREIGN KEY (categoria_id) REFERENCES categorias (id)
            );
        `);

    // 5. Criar Tabela Operações
    await client.query(`
            CREATE TABLE operacoes (
                id SERIAL PRIMARY KEY,
                tipo INT,
                data TIMESTAMP,
                valor NUMERIC,
                conta_id INT NOT NULL,
                status INT,
                categoria_id INT,
                subcategoria_id INT,
                conta_destino_id INT,
                descricao VARCHAR(255),
                local VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_operacoes_contas FOREIGN KEY (conta_id) REFERENCES contas (id),
                CONSTRAINT fk_operacoes_categoria FOREIGN KEY (categoria_id) REFERENCES categorias (id),
                CONSTRAINT fk_operacoes_subcategoria FOREIGN KEY (subcategoria_id) REFERENCES subcategorias (id)
            );
        `);

    // 6. Inserir Dados Iniciais (Opcional, mas útil)
    await client.query(`
            INSERT INTO categorias (nome_categoria, uso, status) VALUES 
            ('Alimentação', 1, true), ('Moradia', 1, true);
        `);

    await client.query(`
            INSERT INTO subcategorias (categoria_id, nome_subcategoria, status) VALUES 
            (1, 'Mercado', true), (2, 'Aluguel', true);
        `);

    console.log("✅ Banco de dados populado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao rodar seed:", err);
  } finally {
    client.release();
    await pool.end(); // Fecha a conexão para encerrar o script
  }
};

seed();
