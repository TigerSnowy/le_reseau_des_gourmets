import type Tag from "../model/tag.js";
import MySQLService from "../service/mysql_service.js";

type InsertResult = {
	insertId: number;
	affectedRows: number;
};

class TagRepository {
	private table = "tag";

	// Récupérer tous les tags
	public selectAll = async (): Promise<Tag[] | unknown> => {
		const connexion = await new MySQLService().connect();
		const sql = `
			SELECT * FROM ${process.env.MYSQL_DATABASE}.${this.table};
		`;

		try {
			const [results] = await connexion.execute(sql);
			return results;
		} catch (error) {
			return error;
		}
	};

	// récupérer les tags d'une recette

	public selectByRecipeId = async (
		recipe_id: number,
	): Promise<Tag[] | unknown> => {
		const connexion = await new MySQLService().connect();
		const sql = `
			SELECT tag.*
			FROM ${process.env.MYSQL_DATABASE}.tag
			JOIN ${process.env.MYSQL_DATABASE}.recipe_tag ON tag.tag_id = recipe_tag.tag_id
			WHERE recipe_tag.recipe_id = :recipe_id;
		`;

		try {
			const [results] = await connexion.execute(sql, { recipe_id });
			return results;
		} catch (error) {
			return error;
		}
	};

	// Vérifier si un tag existe pour cet utilisateur
	public findByNameAndUser = async (
		name: string,
		user_id: number,
	): Promise<Tag | null> => {
		const connexion = await new MySQLService().connect();
		const sql = `
			SELECT * FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE name = :name AND user_id = :user_id;
		`;

		try {
			const [results] = await connexion.execute(sql, { name, user_id });
			const result = (results as Tag[]).shift();
			return result || null;
		} catch (error) {
			return null;
		}
	};

	// Créer un nouveau tag
	public insert = async (tag: Partial<Tag>): Promise<number | null> => {
		const connexion = await new MySQLService().connect();
		const sql = `
			INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table} (name, user_id)
			VALUES (:name, :user_id);
		`;

		try {
			const [result] = await connexion.execute(sql, tag);
			const insertId = (result as InsertResult).insertId;
			return insertId || null;
		} catch (error) {
			return null;
		}
	};

	// Associer un tag à une recette
	public linkToRecipe = async (
		recipe_id: number,
		tag_id: number,
	): Promise<boolean> => {
		const connexion = await new MySQLService().connect();
		const sql = `
			INSERT INTO ${process.env.MYSQL_DATABASE}.recipe_tag (recipe_id, tag_id)
			VALUES (:recipe_id, :tag_id);
		`;

		try {
			await connexion.execute(sql, { recipe_id, tag_id });
			return true;
		} catch (error) {
			return false;
		}
	};
}

export default TagRepository;
