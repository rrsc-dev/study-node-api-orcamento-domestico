import pool from "../../db";
import { OperacaoModel } from "../../models/operacao-model";

export const getTodasOperacoes = async (): Promise<OperacaoModel[]> => {
    const query = `SELECT * FROM operacoes ORDER BY id DESC`;

    const { rows } = await pool.query<OperacaoModel>(query);

    return rows;
}

export const getOperacaoById = async (id: number): Promise<OperacaoModel> => {
    const query = `SELECT * FROM operacoes WHERE id = ($1)`;

    const values = [id];

    const { rows } = await pool.query<OperacaoModel>(query, values);

    return rows[0];
}

export const excluirOperacao = async (id: number): Promise<void> => {
    const query = `DELETE FROM operacoes WHERE id = $1`;
    await pool.query(query, [id]);
}

export const alterarStatusOperacao = async (id: number, status: number): Promise<OperacaoModel> => {
    const query = `UPDATE operacoes SET status = $1 WHERE id = $2 RETURNING *`;

    const values = [status, id];

    const { rows } = await pool.query<OperacaoModel>(query, values);

    return rows[0];
}

export const cadastrarOperacao = async (operacao: OperacaoModel): Promise<OperacaoModel> => {
    const query = `INSERT INTO operacoes (tipo, data, valor, conta_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const values = [operacao.tipo, operacao.data, operacao.valor, operacao.conta_id, operacao.status];

    const { rows } = await pool.query<OperacaoModel>(query, values);

    return rows[0];
}

export const editarOperacao = async (id: number, chave: string, novoValor: string): Promise<OperacaoModel> => {
    const query = `UPDATE operacoes SET $1 = $2 WHERE id = $3`;

    const values = [chave, novoValor, id];

    const { rows } = await pool.query<OperacaoModel>(query, values);

    return rows[0];
}