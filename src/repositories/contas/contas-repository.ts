import * as http from 'http';
import pool from '../../db';
import { ContaModel } from '../../models/conta-model';

export const getTodasContas = async (): Promise<ContaModel[]> => {
    const query = `SELECT * FROM contas ORDER BY id ASC`;
    const { rows } = await pool.query<ContaModel>(query);
    return rows; 
}

export const cadastrarConta = async (conta: ContaModel): Promise<ContaModel> => {
    const query = `INSERT INTO contas (nome, saldo, ativo) VALUES ($1, $2, $3) RETURNING *`;
    const values = [conta.nome, conta.saldo, conta.ativo];

    const { rows } = await pool.query<ContaModel>(query, values);
    return rows[0];
}

export const getContaById = async (id: number): Promise<ContaModel> => {
    const query = `SELECT * FROM contas WHERE id = ($1)`;
    const values = [id];

    const { rows } = await pool.query<ContaModel>(query, values);

    return rows[0];
}

export const getDetalhesConta = async (id: number): Promise<any> => {
    const query = `
        SELECT
            c.id,
            c.nome,
            c.saldo,
            c.ativo,
            c.created_at,
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', o.id,
                        'tipo', o.tipo,
                        'data', o.data,
                        'valor', o.valor,
                        'status', o.status,
                        'created_at', o.created_at,
                        'updated_at', o.updated_at
                    )
                ) FILTER (WHERE o.id IS NOT NULL),
                '[]'
            ) AS operacoes
        FROM contas c
        LEFT JOIN operacoes o
            ON o.conta_id = c.id
        WHERE c.id = ($1)
        GROUP BY c.id;
    `

    const values = [id];

    const { rows } = await pool.query<any>(query, values);

    return rows[0];
}

export const editarContaRepository = async (id: number, nome: string): Promise<ContaModel> => {
    const query = 'UPDATE contas SET nome = $1 WHERE id = $2 RETURNING *';

    const values = [nome, id];

    const { rows } = await pool.query<ContaModel>(query, values);

    return rows[0];
}

export const excluirContaRepository = async (id: number): Promise<void> => {
    const query = 'DELETE FROM contas WHERE id = $1';
    await pool.query(query, [id]);
}

export const desativarContaRepository = async (id: number): Promise<ContaModel> => {
    const query = 'UPDATE contas SET ativo = false WHERE id = $1 RETURNING *';
    const { rows } = await pool.query<ContaModel>(query, [id]);

    return rows[0];
}

export const atualizarSaldoRepository = async (id: number, novoSaldo: number): Promise<ContaModel> => {
    const query = 'UPDATE contas SET saldo = $1 WHERE id = $2 RETURNING *';
    const values = [novoSaldo, id];
    const { rows } = await pool.query<ContaModel>(query, values);

    return rows[0];
}