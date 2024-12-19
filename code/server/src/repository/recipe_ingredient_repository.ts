import type Ingredient from "../model/ingredient.js";
import type RecipeIngredient from "../model/recipe_ingredient.js";
import MySQLService from "../service/mysql_service.js";
import IngredientRepository from "./ingredient_repository.js";

class RecipeIngredientRepository {
	private table = "recipe_ingredient";

	public selectByRecipeId = async (
		id: number,
	): Promise<RecipeIngredient[] | unknown> => {
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
			const [results] = await connexion.execute(sql, { recipe_id: id });

			for (let i = 0; i < (results as RecipeIngredient[]).length; i++) {
				const result = (results as RecipeIngredient[])[i];

				result.ingredient = (await new IngredientRepository().selectOne({
					ingredient_id: result.ingredient_id,
				})) as Ingredient;
			}

			return results;
		} catch (error) {
			return error;
		}
	};
}
export default RecipeIngredientRepository;
