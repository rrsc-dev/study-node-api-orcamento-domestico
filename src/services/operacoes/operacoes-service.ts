import { ContaModel } from "../../models/conta-model";
import { OperacaoModel } from "../../models/operacao-model";
import { atualizarSaldoRepository, getContaById } from "../../repositories/contas/contas-repository";
import { alterarStatusOperacao, cadastrarOperacao, editarOperacao, excluirOperacao, getOperacaoById, getTodasOperacoes } from "../../repositories/operacoes/operacoes-repository";

export const cadastrarOperacaoService = async (operacao: OperacaoModel): Promise<OperacaoModel> => {
    if (!operacao.tipo && !operacao.valor) {
        throw new Error("Dados não cadastrados");
    }

    const novaOperacao = await cadastrarOperacao(operacao);
    console.log(novaOperacao);
    if (novaOperacao) {
        // Pegar o id da conta
        const idConta = novaOperacao.conta_id;

        // Buscar conta
        const conta: ContaModel = await getContaById(idConta);

        if(conta) {
            console.log('conta encontrada');

            const saldoAtual = Number(conta.saldo) || 0;
            const valorOperacao = Number(novaOperacao.valor);

            // verificar tipo de operação
            if (novaOperacao.tipo === 1) {
                // Receita
                const novoSaldo: number = saldoAtual + valorOperacao;

                await atualizarSaldoRepository(idConta, novoSaldo);

                return novaOperacao;
            } else if (novaOperacao.tipo === 2) {
                // Despesa
                //verifica saldo
                if (conta.saldo <= 0) {
                    return novaOperacao;
                } else{
                    const novoSaldo: number = saldoAtual - valorOperacao;

                    await atualizarSaldoRepository(idConta, novoSaldo);

                    return novaOperacao;
                }
            } else {
                console.log('tipo de operação não reconhecidos');
            }
        } else {
            await excluirOperacao(novaOperacao.id);
        }
    }

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

export const excluirOperacaoService = async(operacaoId: string | undefined): Promise<void> => {
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
}

export const alterarStatusOperacaoService = async(operacaoId: string | undefined, body: any): Promise<OperacaoModel> => {
    const match = operacaoId?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido");
    }

    const id = parseInt(idParam,10);
    const statusInt = parseInt(body.status,10);

    if (isNaN(id) || isNaN(statusInt)) {
        throw new Error("ID ou Status inválido");
    }

    const data = await alterarStatusOperacao(id, statusInt);

    return data;
}

export const editarOperacaoService = async(operacaoId: string | undefined, chave: string, novoValor: string) => {
    const match = operacaoId?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido");
    }

    const id = parseInt(idParam,10);

    if (isNaN(id)) {
        throw new Error("ID inválido");
    }

    const operacaoAtualizada = await editarOperacao(id, chave, novoValor);

    return operacaoAtualizada;
}