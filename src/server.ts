import * as http from 'http';
import { app } from './app';

const port = 3333;

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Servidor rodando na porta 3333");
});