import { getTodasContas, cadastrarConta, editarContaRepository, excluirContaRepository, desativarContaRepository, atualizarSaldoRepository, getDetalhesConta } from "../../repositories/contas/contas-repository";
import { ContaModel } from "../../models/conta-model";
import { getContaById } from "../../repositories/contas/contas-repository";

export const getTodasContasService = async (): Promise<ContaModel[]> => {
    const data = await getTodasContas();

    return data;
}

export const cadastrarContaService = async (conta: ContaModel): Promise<ContaModel> => {
    if (!conta.nome) {
        throw new Error("O nome da conta é obrigatório.");
    }
    
    const novaConta = await cadastrarConta(conta);
    return novaConta;
};

export const editarContaService = async (contaId: string | undefined, body: any): Promise<ContaModel> => {
    const match = contaId?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido na URL");
    }

    const id = parseInt(idParam, 10);
    const contaAtualizada = await editarContaRepository(id, body.nome);

    return contaAtualizada;
}

export const getContaByIdService = async (contaId: string | undefined): Promise<ContaModel> => {
    const match = contaId?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido na URL");
    }

    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
        throw new Error("ID inválido");
    }

    const data = await getContaById(id);

    if (!data) {
        throw new Error("Conta não encontrada");
    }

    return data;
}

export const getDetalhesContaService = async (contaId: string | undefined): Promise<ContaModel> => {
    const match = contaId?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido na URL");
    }

    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
        throw new Error("ID inválido");
    }

    const data = await getDetalhesConta(id);

    if (!data) {
        throw new Error("Conta não encontrada");
    }

    return data;
}

export const excluirContaService = async (contaId: string | undefined): Promise<void> => {
    const match = contaId?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido na URL");
    }

    const id = parseInt(idParam, 10);

    await excluirContaRepository(id);
}

export const desativarContaService = async (contaId: string | undefined): Promise<ContaModel> => {
    const match = contaId?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido na URL");
    }

    const id = parseInt(idParam, 10);

    const contaAtualizada = await desativarContaRepository(id);

    return contaAtualizada;
}

export const atualizarSaldoService = async (contaId: string | undefined, body: any): Promise<ContaModel> => {
    const match = contaId?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null;

    if (!idParam) {
        throw new Error("ID não fornecido na URL");
    }

    const id = parseInt(idParam, 10);
    const contaAtualizada = await atualizarSaldoRepository(id, body.saldo);

    return contaAtualizada;
}