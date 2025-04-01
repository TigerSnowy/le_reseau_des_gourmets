import type Ingredient from "../model/ingredient.js";
import MySQLService from "../service/mysql_service.js";

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

	// public selectInList = async (
	// 	list: string,
	// ): Promise<Ingredient[] | unknown> => {
	// 	const connexion = await new MySQLService().connect();

	// 	const sql = `
	//         SELECT
	//             ${this.table}.*
	//         FROM
	//             ${process.env.MYSQL_DATABASE}.${this.table}
	// 		WHERE
	// 			${this.table}.ingredient_id IN (${list})
	// 		;
	//     `;

	// 	try {
	// 		const [results] = await connexion.execute(sql);

	// 		return results;
	// 	} catch (error) {
	// 		return error;
	// 	}
	// };

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
				${this.table}.recipe_id = :recipe_id;
		`;

		try {
			const [results] = await connexion.execute(sql, { recipe_id });
			return results;
		} catch (error) {
			return error;
		}
	};
}
export default IngredientRepository;
