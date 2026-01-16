import { IncomingMessage, ServerResponse } from "http";
import { atualizarSaldoService, cadastrarContaService, desativarContaService, editarContaService, excluirContaService, getDetalhesContaService, getTodasContasService } from "../../services/contas/contas-service";
import { getBody } from "../../utils/body-parser";
import { ContaModel } from "../../models/conta-model";
import { getContaByIdService } from "../../services/contas/contas-service";

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

export const getContaById = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const conta: ContaModel = await getContaByIdService(req.url);

        res.writeHead(200, {'content-type': 'application/json' });
        res.end(JSON.stringify(conta));
    } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message || 'Erro inesperado' }));
    }
}


export const getDetalhesConta = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const conta: any = await getDetalhesContaService(req.url);

        res.writeHead(200, {'content-type': 'application/json' });
        res.end(JSON.stringify(conta));
    } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message || 'Erro inesperado' }));
    }
}


export const editarContaController = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getBody(req) as ContaModel;
        const conta: ContaModel = await editarContaService(req.url, body)

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(conta));
    } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message || 'Erro inesperado' }));
    }
}

export const excluirConta = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        await excluirContaService(req.url);
        res.writeHead(204); // No Content (Sucesso sem corpo)
        res.end();
    } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message || 'Erro inesperado' }));
    }
}

export const atualizarSaldoController = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getBody(req) as ContaModel;
        const conta: ContaModel = await atualizarSaldoService(req.url, body);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(conta));;
    } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message || 'Erro inesperado' }));
    }
}

export const desativarContaController = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const conta: ContaModel = await desativarContaService(req.url);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(conta));
    } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message || 'Erro inesperado' }));
    }
}