import pool from "../../db";

export const getTodasOperacoes = async (): Promise<OperacaoModel[]> => {
    // TODO
}

export const getOperacaoById = async (id: number): Promise<OperacaoModel> => {
    // TODO
}

export const excluirOperacao = async (id: number): Promise<void> => {
    // TODO
}

export const alterarStatusOperacao = async (id: number, status: number): Promise<OperacaoModel> => {
    // TODO
}

export const cadastrarOperacao = async (operacao: OperacaoModel): Promise<OperacaoModel> => {
    // TODO
}

export const editarOperacao = async (id: number, chave: string, novoValor: string): Promise<OperacaoModel> => {
    // TODO
}