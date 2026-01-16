import { OperacaoModel } from "../../models/operacao-model";
import { cadastrarOperacao, getTodasOperacoes } from "../../repositories/operacoes/operacoes-repository";

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