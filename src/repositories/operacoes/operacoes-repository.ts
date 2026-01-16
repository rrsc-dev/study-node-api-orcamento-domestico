import pool from "../../db";
import { OperacaoModel } from "../../models/operacao-model";

// export const getTodasOperacoes = async (): Promise<OperacaoModel[]> => {
//     // TODO
// }

// export const getOperacaoById = async (id: number): Promise<OperacaoModel> => {
//     // TODO
// }

// export const excluirOperacao = async (id: number): Promise<void> => {
//     // TODO
// }

// export const alterarStatusOperacao = async (id: number, status: number): Promise<OperacaoModel> => {
//     // TODO
// }

export const cadastrarOperacao = async (operacao: OperacaoModel): Promise<OperacaoModel> => {
    const query = `INSERT INTO operacoes (tipo, data, valor, conta_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const values = [operacao.tipo, operacao.data, operacao.valor, operacao.conta_id, operacao.status];

    const { rows } = await pool.query<OperacaoModel>(query, values);

    return rows[0];
    
}

// export const editarOperacao = async (id: number, chave: string, novoValor: string): Promise<OperacaoModel> => {
//     // TODO
// }