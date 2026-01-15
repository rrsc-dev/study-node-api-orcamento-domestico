export interface OperacaoModel {
    id: number;
    tipo: number;
    data: Date;
    valor: number
    conta_id: number;
    status: number;
}