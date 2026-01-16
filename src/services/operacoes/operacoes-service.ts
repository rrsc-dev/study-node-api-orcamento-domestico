import { OperacaoModel } from "../../models/operacao-model";
import { cadastrarOperacao, getOperacaoById, getTodasOperacoes } from "../../repositories/operacoes/operacoes-repository";

export const cadastrarOperacaoService = async (operacao: OperacaoModel): Promise<OperacaoModel> => {
    if (!operacao.tipo && !operacao.valor) {
        throw new Error("Dados não cadastrados");
    }

    const novaOperacao = await cadastrarOperacao(operacao);
    return novaOperacao;
}

export const getTodasOperacoesService = async (): Promise<OperacaoModel[]> => {
    const data = await getTodasOperacoes();

    return data;
}

export const getOperacaoByIdService = async (operacaoId: string | undefined): Promise<OperacaoModel> => {
    const match = operacaoId?.match(/[?&]id=(\d+)/);

    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido");
    }

    const id = parseInt(idParam,10);

    if (isNaN(id)) {
        throw new Error("ID inválido");
    }

    const data = await getOperacaoById(id);

    if (!data) {
        throw new Error("Operação não encontrada");
    }

    return data;
}