import type Recipe from "../model/recipe.js";
import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";
import UserRepository from "./user_repository.js";

class RecipeRepository {
	private table = "recipe";

	public selectAll = async (): Promise<Recipe[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table};
        `;

		try {
			const [results] = await connexion.execute(sql);

			for (let i = 0; i < (results as Recipe[]).length; i++) {
				const result = (results as Recipe[])[i];

				result.user = (await new UserRepository().selectOne({
					user_id: result.user_id,
				})) as User;
			}

			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Recipe>,
	): Promise<Recipe[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.recipe_id = :recipe_id
				;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			const result = (results as Recipe[]).shift() as Recipe;

			result.user = (await new UserRepository().selectOne({
				user_id: result.user_id,
			})) as User;

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default RecipeRepository;
