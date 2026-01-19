export interface OperacaoModel {
    id: number;
    tipo: number;
    data: string;
    valor: number;
    conta_id: number;
    conta_destino_id?: number;
    status?: number;
}

export enum TipoOperacao {
    RECEITA = 1,
    DESPESA = 2,
    TRANSFERENCIA = 3
}