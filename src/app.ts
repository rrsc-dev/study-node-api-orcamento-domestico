import * as http from "http";
import pool from "./db";
import { HttpMethod } from "./utils/http-methods";
import { Routes } from "./router/routes";
import {
  atualizarSaldoController,
  cadastrarConta,
  desativarContaController,
  editarContaController,
  excluirConta,
  getContaById,
  getDetalhesConta,
  getTodasContas,
} from "./controllers/contas/contas-controller";
import {
  cadastrarOperacao,
  excluirOperacao,
  getOperacaoById,
  getTodasOperacoes,
} from "./controllers/operacoes/operacoes-controller";

export const app = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  // Configuração CORS Manual
  res.setHeader("Access-Control-Allow-Origin", "*"); // Ou 'http://localhost:5173'
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Se for uma requisição OPTIONS (pre-flight do navegador), retorna OK e para
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const baseUrl = req.url?.split("?")[0];

  if (req.method === HttpMethod.GET && baseUrl === Routes.LISTA_CONTAS) {
    await getTodasContas(req, res);
  }

  if (req.method === HttpMethod.GET && baseUrl === Routes.GET_CONTA_BY_ID) {
    await getContaById(req, res);
  }

  if (req.method === HttpMethod.GET && baseUrl === Routes.GET_DETALHES_CONTA) {
    await getDetalhesConta(req, res);
  }

  if (req.method === HttpMethod.POST && baseUrl === Routes.CADASTRAR_CONTA) {
    await cadastrarConta(req, res);
  }

  if (req.method === HttpMethod.PUT && baseUrl === Routes.EDITAR_CONTA) {
    await editarContaController(req, res);
  }

  if (req.method === HttpMethod.DELETE && baseUrl === Routes.EXCLUIR_CONTA) {
    await excluirConta(req, res);
  }

  if (req.method === HttpMethod.PATCH && baseUrl === Routes.ATUALIZAR_SALDO) {
    await atualizarSaldoController(req, res);
  }

  if (req.method === HttpMethod.PATCH && baseUrl === Routes.DESATIVAR_CONTA) {
    await desativarContaController(req, res);
  }

  // Operações
  if (req.method === HttpMethod.POST && baseUrl === Routes.CADASTRAR_OPERACAO) {
    await cadastrarOperacao(req, res);
  }

  if (req.method === HttpMethod.GET && baseUrl === Routes.LISTA_OPERACOES) {
    await getTodasOperacoes(req, res);
  }

  if (req.method === HttpMethod.DELETE && baseUrl === Routes.EXCLUIR_OPERACAO) {
    await excluirOperacao(req, res);
  }

  if (req.method === HttpMethod.GET && baseUrl === Routes.GET_OPERACAO_BY_ID) {
    await getOperacaoById(req, res);
  }
};
