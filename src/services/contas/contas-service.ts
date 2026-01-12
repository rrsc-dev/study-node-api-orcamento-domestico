import { getTodasContas, cadastrarConta } from "../../repositories/contas/contas-repository";
import { ContaModel } from "../../models/conta-model";

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