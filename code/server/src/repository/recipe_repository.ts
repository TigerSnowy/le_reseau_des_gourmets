import type Ingredient from "../model/ingredient.js";
import type Picture from "../model/picture.js";
import type Recipe from "../model/recipe.js";
import type RecipeIngredient from "../model/recipe_ingredient.js";
import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";
import IngredientRepository from "./ingredient_repository.js";
import PictureRepository from "./picture_repository.js";
import RecipeIngredientRepository from "./recipe_ingredient_repository.js";
import UserRepository from "./user_repository.js";

class RecipeRepository {
	private table = "recipe";

	public selectAll = async (): Promise<Recipe[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*,
				GROUP_CONCAT(picture.picture_id) AS picture_ids,
				GROUP_CONCAT(ingredient.ingredient_id) AS ingredient_ids
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.recipe_picture
			ON
				recipe_picture.recipe_id = ${this.table}.recipe_id
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.picture
			ON
				recipe_picture.picture_id = picture.picture_id
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.recipe_ingredient
			ON
				recipe_ingredient.recipe_id = ${this.table}.recipe_id
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.ingredient
			ON
				recipe_ingredient.ingredient_id = ingredient.ingredient_id
			GROUP BY
				${this.table}.recipe_id 
			;
        `;

		try {
			const [results] = await connexion.execute(sql);

			for (let i = 0; i < (results as Recipe[]).length; i++) {
				const result = (results as Recipe[])[i];

				result.user = (await new UserRepository().selectOne({
					user_id: result.user_id,
				})) as User;

				result.pictures = (await new PictureRepository().selectInList(
					result.picture_ids,
				)) as Picture[];

				result.recipe_ingredients =
					(await new RecipeIngredientRepository().selectByRecipeId(
						result.recipe_id,
					)) as RecipeIngredient[];
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

	public insert = async (
		data: Partial<Recipe>,
	): Promise<Recipe[] | unknown> => {
		const connexion = await new MySQLService().connect();

		let sql = `

			INSERT INTO 
				${process.env.MYSQL_DATABASE}.${this.table}
			VALUES
				(
					NULL,
					:title,
					:preparation_time,
					:cooking_time,
					:difficulty,
					:description,
					:user_id
				)
			;
        `;

		try {
			// crée une transaction SQL
			connexion.beginTransaction();

			// exécute la première requête
			await connexion.execute(sql, data);

			// crée une variable SQL stockant le dernier identifiant créé
			sql = `
				SET @id = LAST_INSERT_ID();
			`;

			// exécute la requête
			await connexion.execute(sql, data);

			// une autre requête SQL de la transaction
			// j'ai 5 dans mon body, je veux > (15, NULL, @id, 5), (15, NULL, @id, 6), (15, NULL, @id, 7)
			const values = data.ingredient_ids
				?.split(",")
				.map((item) => `(15, NULL, @id, ${item})`)
				.join(",");

			// console.log(values);

			sql = `
				INSERT INTO
					${process.env.MYSQL_DATABASE}.recipe_ingredient
				VALUES
					${values}
			`;

			// récupère les résultats de la requête
			const [results] = await connexion.execute(sql, data);

			// valider la transaction lorsque l'ensemble des requêtes d'une transaction ont réussi
			connexion.commit();

			// si la requête a réussi
			return results;
		} catch (error) {
			// annuler l'ensemble des requêtes de la transaction si l'UNE des requêtes a échoué
			connexion.rollback();

			// si la requête a échoué
			return error;
		}
	};

	public update = async (
		data: Partial<Recipe>,
	): Promise<Recipe[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `

			UPDATE
				${process.env.MYSQL_DATABASE}.${this.table}
			SET
				${this.table}.title = :title,
				${this.table}.preparation_time = :preparation_time,
				${this.table}.cooking_time = :cooking_time,
				${this.table}.difficulty = :difficulty,
				${this.table}.description = :description,
				${this.table}.user_id = :user_id
			WHERE
				${this.table}.recipe_id = :recipe_id
			;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			return results;
		} catch (error) {
			return error;
		}
	};
}
export default RecipeRepository;
