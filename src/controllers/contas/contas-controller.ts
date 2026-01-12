import { IncomingMessage, ServerResponse } from "http";
import { cadastrarContaService, getTodasContasService } from "../../services/contas/contas-service";
import { getBody } from "../../utils/body-parser";
import { ContaModel } from "../../models/conta-model";

export const getTodasContas = async (req: IncomingMessage, res: ServerResponse) => {
    
    try {
        const contas = await getTodasContasService();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(contas));
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Erro ao buscar contas' }));
    }
}

export const cadastrarConta = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getBody(req) as ContaModel;
        
        const novaConta = await cadastrarContaService(body);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(novaConta));

    } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message || 'Erro inesperado' }));
    }
};