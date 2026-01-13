import * as http from 'http';
import pool from '../../db';
import { ContaModel } from '../../models/conta-model';

export const getTodasContas = async (): Promise<ContaModel[]> => {
    const query = `SELECT * FROM contas ORDER BY id ASC`;
    const { rows } = await pool.query<ContaModel>(query);
    return rows; 
}

export const cadastrarConta = async (conta: ContaModel): Promise<ContaModel> => {
    const query = `INSERT INTO contas (nome) VALUES ($1) RETURNING *`;
    const values = [conta.nome];

    const { rows } = await pool.query<ContaModel>(query, values);
    return rows[0];
}

export const getContaById = async (id: number): Promise<ContaModel> => {
    const query = `SELECT * FROM contas WHERE id = ($1)`;
    const values = [id];

    const { rows } = await pool.query<ContaModel>(query, values);

    return rows[0];
}