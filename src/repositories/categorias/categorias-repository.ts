import pool from "../../db";
import { CategoriaModel } from "../../models/categoria-model";

export const cadastrarCategoria = async (categoria: CategoriaModel): Promise<CategoriaModel> => {
    const query = `INSERT INTO categorias (nome_categoria, status, uso) VALUES () RETURNING *`;
    const values = [categoria.nomeCategoria, categoria.status, categoria.uso];

    const { rows } = await pool.query<CategoriaModel>(query, values);

    return rows[0];
}

export const getTodasCategorias = async (): Promise<CategoriaModel[]> => {
    const query = `SELECT * FROM categorias ORDER BY id ASC`;

    const { rows } = await pool.query<CategoriaModel>(query);

    return rows;
}

export const getCategoriaById = async (id: number): Promise<CategoriaModel> => {
    const query = `SELECT * FROM categorias WHERE id = ($1)`;
    const values = [id];

    const { rows } = await pool.query<CategoriaModel>(query, values);

    return rows[0];
}