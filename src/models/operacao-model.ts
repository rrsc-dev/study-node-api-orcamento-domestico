export interface OperacaoModel {
    id: number;
    tipo: number;
    data: string;
    descricao?: string;
    local?: string;
    valor: number;
    conta_id: number;
    conta_destino_id?: number;
    categoria_id?: number;
    subcategoria_id?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
}

export enum TipoOperacao {
    RECEITA = 1,
    DESPESA = 2,
    TRANSFERENCIA = 3
}