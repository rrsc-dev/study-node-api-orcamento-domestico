import { IncomingMessage, ServerResponse } from "http";
import { OperacaoModel } from "../../models/operacao-model";
import { getBody } from "../../utils/body-parser";
import { cadastrarOperacaoService, getTodasOperacoesService } from "../../services/operacoes/operacoes-service";

export const getTodasOperacoes = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const operacoes = await getTodasOperacoesService();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(operacoes));
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Erro ao buscar contas' }));
    }
}

export const cadastrarOperacao = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getBody(req) as OperacaoModel

        const novaOperacao = await cadastrarOperacaoService(body);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(novaOperacao));
    } catch (error) {

        console.log('ERRO: ', error);

        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Erro ao cadastrar operação' }));
    }
}