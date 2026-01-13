import * as http from 'http';
import pool from './db';
import { HttpMethod } from './utils/http-methods';
import { Routes } from './router/routes';
import { cadastrarConta, getContaById, getTodasContas } from './controllers/contas/contas-controller';

export const app = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const baseUrl = req.url?.split("?")[0];

    if (req.method === HttpMethod.GET && baseUrl === Routes.LISTA_CONTAS) {
        await getTodasContas(req, res);
    }

    if (req.method === HttpMethod.GET && baseUrl === Routes.GET_CONTA_BY_ID) {
        await getContaById(req, res);
    }

    if (req.method === HttpMethod.POST && baseUrl === Routes.CADASTRAR_CONTA){
        await cadastrarConta(req, res);
    }
}