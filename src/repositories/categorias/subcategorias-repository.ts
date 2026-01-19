import pool from "../../db";
import { SubcategoriaModel } from "../../models/subcategoria-model";

export const cadastrarsubcategoria = async (subcategoria: SubcategoriaModel): Promise<SubcategoriaModel> => {
    const query = `INSERT INTO subcategorias (nome_subcategoria, status, categoria_id) VALUES () RETURNING *`;
    const values = [subcategoria.nomeSubcategoria, subcategoria.status, subcategoria.categoriaId];

    const { rows } = await pool.query<SubcategoriaModel>(query, values);

    return rows[0];
}

export const getTodassubcategorias = async (): Promise<SubcategoriaModel[]> => {
    const query = `SELECT * FROM subcategorias ORDER BY id ASC`;

    const { rows } = await pool.query<SubcategoriaModel>(query);

    return rows;
}

export const getsubcategoriaById = async (id: number): Promise<SubcategoriaModel> => {
    const query = `SELECT * FROM subcategorias WHERE id = ($1)`;
    const values = [id];

    const { rows } = await pool.query<SubcategoriaModel>(query, values);

    return rows[0];
}

export const excluirsubcategoria = async (id: number): Promise<void> => {
    const query = 'DELETE FROM subcategorias WHERE id = $1';
    await pool.query(query, [id]);
}

export const desativarsubcategoria = async (id: number): Promise<SubcategoriaModel> => {
    const query = 'UPDATE subcategorias SET status = false WHERE id = $1 RETURNING *';
    const { rows } = await pool.query<SubcategoriaModel>(query, [id]);

    return rows[0];
}