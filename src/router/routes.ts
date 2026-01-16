export enum Routes {
    LISTA_CONTAS = '/api/contas/getTodasContas',
    CADASTRAR_CONTA = '/api/contas/cadastrarConta',
    GET_CONTA_BY_ID = '/api/contas/getContaById',
    EDITAR_CONTA = '/api/contas/editarConta',
    EXCLUIR_CONTA = '/api/contas/excluirConta',
    DESATIVAR_CONTA = '/api/contas/desativarConta',
    ATUALIZAR_SALDO = '/api/contas/atualizarConta',

    CADASTRAR_OPERACAO = '/api/operacoes/cadastrarOperacao',
    LISTA_OPERACOES = '/api/operacoes/getTodasOperacoes',
    GET_OPERACAO_BY_ID = '/api/operacoes/getOperacaoById',
    EDITAR_OPERACAO = '/api/operacoes/editarOperacao',
    EXCLUIR_OPERACAO ='/api/operacoes/excluirOperacao',
}