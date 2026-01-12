
import pool from './db';

async function testConnection() {
    try {
        console.log("Tentando conectar ao PostgreSQL...");
        
        const client = await pool.connect();
        
        console.log("✅ Conexão bem-sucedida! O banco está acessível.");
        
        client.release();

    } catch (error) {
        console.error("❌ Falha na conexão:");
        if (error instanceof Error) {
            console.error(error.message);
        }
    } finally {
        await pool.end();
    }
}

testConnection();