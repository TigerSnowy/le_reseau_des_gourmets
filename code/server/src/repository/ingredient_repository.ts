import type Ingredient from "../model/ingredient.js";
import MySQLService from "../service/mysql_service.js";

type InsertResult = {
	insertId: number;
	affectedRows: number;
};

class IngredientRepository {
	private table = "ingredient";

	public selectAll = async (): Promise<Ingredient[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table};
        `;

		try {
			const [results] = await connexion.execute(sql);

			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Ingredient>,
	): Promise<Ingredient | null> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.ingredient_id = :ingredient_id
				;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			const result = (results as Ingredient[]).shift();

			return result || null;
		} catch (error) {
			return null;
		}
	};

	// charger les ingrédients d'une recette

	public selectByRecipeId = async (
		recipe_id: number,
	): Promise<Ingredient[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			SELECT
				${this.table}.*
			FROM
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.recipe_id = :recipe_id
			ORDER BY
				${this.table}.ingredient_id ASC;
		`;

		try {
			const [results] = await connexion.execute(sql, { recipe_id });
			return results;
		} catch (error) {
			return error;
		}
	};

	// insérer un ingrédient
	public insert = async (
		data: Partial<Ingredient>,
	): Promise<number | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			(name, quantity, unit, recipe_id)
			VALUES
			(:name, :quantity, :unit, :recipe_id);
		`;

		try {
			const [result] = await connexion.execute(sql, data);

			return (result as InsertResult).insertId;
		} catch (error) {
			return error;
		}
	};

	// mettre à jour un ingrédient
	public update = async (data: Partial<Ingredient>): Promise<unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
			SET
				name = :name,
				quantity = :quantity,
				unit = :unit
			WHERE
				ingredient_id = :ingredient_id;
		`;

		try {
			const [result] = await connexion.execute(sql, data);

			return result;
		} catch (error) {
			return error;
		}
	};

	// supprimer un ingrédient
	public delete = async (data: Partial<Ingredient>): Promise<unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				ingredient_id = :ingredient_id;
		`;

		try {
			const [result] = await connexion.execute(sql, data);

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default IngredientRepository;
