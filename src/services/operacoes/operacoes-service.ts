import { ContaModel } from "../../models/conta-model";
import { OperacaoModel, TipoOperacao } from "../../models/operacao-model";
import { atualizarSaldoRepository, getContaById } from "../../repositories/contas/contas-repository";
import { alterarStatusOperacao, cadastrarOperacao, excluirOperacao, getOperacaoById, getTodasOperacoes } from "../../repositories/operacoes/operacoes-repository";
import { getIdParamsMatch } from "../../utils/params-regex";

const processaReceita = async (operacao: OperacaoModel, conta: ContaModel): Promise<any> => {

}

const processaDespesa = async (operacao: OperacaoModel, conta: ContaModel): Promise<any> => {

}

export const cadastrarOperacaoService = async (operacao: OperacaoModel): Promise<OperacaoModel> => {
    if (!operacao.tipo && !operacao.valor) {
        throw new Error("Tipo e/ou valor não cadastrados");
    }

    const idConta = operacao.conta_id;
    const conta: ContaModel = await getContaById(idConta);

    if (!conta) {
        throw new Error("Conta não encontrada");
    }

    const idContaDestino = operacao.conta_destino_id;
    const contaDestino: ContaModel = await getContaById(idContaDestino!);

    if (operacao.tipo === TipoOperacao.TRANSFERENCIA) {
        if (!contaDestino) {
            throw new Error("Conta destino não encontrada");
        }
    }

    if ((operacao.tipo === TipoOperacao.DESPESA || operacao.tipo === TipoOperacao.TRANSFERENCIA) && conta.saldo <= 0) {
        throw new Error("Conta sem saldo para realizar operação");
    }

    const novaOperacao = await cadastrarOperacao(operacao);

    console.log(novaOperacao);

    if (novaOperacao) {
        let contaDestinoId = null;
        let contaDestino: ContaModel;

        if (novaOperacao.tipo === TipoOperacao.TRANSFERENCIA) {
            contaDestinoId = novaOperacao.conta_destino_id;

            if (contaDestinoId) {
                contaDestino = await getContaById(contaDestinoId);
            }
        }

        const idConta = novaOperacao.conta_id;

        const conta: ContaModel = await getContaById(idConta);
        
        if(conta) {
            console.log('conta encontrada');

            const saldoAtual = Number(conta.saldo) || 0;
            const valorOperacao = Number(novaOperacao.valor);

            if (novaOperacao.tipo === TipoOperacao.RECEITA) {
                const novoSaldo: number = saldoAtual + valorOperacao;

                await atualizarSaldoRepository(idConta, novoSaldo);

                return novaOperacao;
            } else if (novaOperacao.tipo === TipoOperacao.DESPESA) {
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
    const idParam = getIdParamsMatch(operacaoId);

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
    const idParam = getIdParamsMatch(operacaoId);

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
    const idParam = getIdParamsMatch(operacaoId);

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

// export const editarOperacaoService = async(operacaoId: string | undefined, chave: string, novoValor: string) => {
//     const idParam = getIdParamsMatch(operacaoId);

//     if (!idParam) {
//         throw new Error("ID não fornecido");
//     }

//     const id = parseInt(idParam,10);

//     if (isNaN(id)) {
//         throw new Error("ID inválido");
//     }

//     const operacaoAtualizada = await editarOperacao(id, chave, novoValor);

//     return operacaoAtualizada;
// }