import type Ingredient from "../model/ingredient.js";
import type Instruction from "../model/instruction.js";
import type Tag from "../model/tag.js";
import type Picture from "../model/picture.js";
import type Recipe from "../model/recipe.js";
import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";
import IngredientRepository from "./ingredient_repository.js";
import PictureRepository from "./picture_repository.js";
import UserRepository from "./user_repository.js";
import InstructionRepository from "./instruction_repository.js";
import TagRepository from "./tag_repository.js";

class RecipeRepository {
	private table = "recipe";

	public selectAll = async (userId?: number): Promise<Recipe[] | unknown> => {
		const connexion = await new MySQLService().connect();

		let sql = `
		SELECT
		  ${this.table}.*
		FROM 
		  ${process.env.MYSQL_DATABASE}.${this.table}
	  `;

		// si un userId est fourni, filtrer les recettes de cet utilisateur
		if (userId) {
			sql += ` WHERE ${this.table}.user_id = ?`;
		}

		sql += ";";

		try {
			const [results] = userId
				? await connexion.execute(sql, [userId])
				: await connexion.execute(sql);

			for (let i = 0; i < (results as Recipe[]).length; i++) {
				const result = (results as Recipe[])[i];

				result.user = (await new UserRepository().selectOne({
					user_id: result.user_id,
				})) as User;

				const pictures = await new PictureRepository().selectByRecipeId(
					result.recipe_id,
				);
				result.picture = (pictures as Picture[])[0];

				result.ingredients = (await new IngredientRepository().selectByRecipeId(
					result.recipe_id,
				)) as Ingredient[];

				result.instructions =
					(await new InstructionRepository().selectByRecipeId(
						result.recipe_id,
					)) as Instruction[];

				result.tags = (await new TagRepository().selectByRecipeId(
					result.recipe_id,
				)) as Tag[];
			}

			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Recipe>,
	): Promise<Recipe[] | unknown> => {
		if (!data.recipe_id) return [];

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

			const pictures = await new PictureRepository().selectByRecipeId(
				result.recipe_id,
			);
			result.picture = (pictures as Picture[])[0];

			result.ingredients = (await new IngredientRepository().selectByRecipeId(
				result.recipe_id,
			)) as Ingredient[];

			result.instructions = (await new InstructionRepository().selectByRecipeId(
				result.recipe_id,
			)) as Instruction[];

			result.tags = (await new TagRepository().selectByRecipeId(
				result.recipe_id,
			)) as Tag[];

			return result;
		} catch (error) {
			return error;
		}
	};

	public insert = async (
		data: Partial<Recipe>,
	): Promise<Recipe[] | unknown> => {
		if (!data.user_id) return [];

		const connexion = await new MySQLService().connect();

		try {
			await connexion.beginTransaction();

			const sql = `
				INSERT INTO 
					${process.env.MYSQL_DATABASE}.${this.table}
				(
					recipe_id, title, preparation_time, cooking_time, difficulty, description, user_id	
				)
				VALUES (
					NULL, :title, :preparation_time, :cooking_time, :difficulty, :description, :user_id
				);
			`;
			await connexion.execute(sql, data);

			const [isResult] = await connexion.execute(
				"SELECT LAST_INSERT_ID() as id;",
			);
			const recipe_id = (isResult as { id: number }[])[0].id;

			// insert Ingredients

			if (data.ingredients?.length) {
				for (const ingredient of data.ingredients) {
					await connexion.execute(
						"INSERT INTO ingredient (name, quantity, unit, recipe_id) VALUES (:name, :quantity, :unit, :recipe_id);",
						{ ...ingredient, recipe_id },
					);
				}
			}

			// insert Instructions

			if (data.instructions?.length) {
				for (const instruction of data.instructions) {
					await connexion.execute(
						"INSERT INTO instruction (step_number, text, recipe_id) VALUES (:step_number, :text, :recipe_id);",
						{ ...instruction, recipe_id },
					);
				}
			}

			// insert Tags

			if (data.tags?.length) {
				const tagRepo = new TagRepository();

				for (const tag of data.tags) {
					let existingTag = await tagRepo.findByNameAndUser(
						tag.name,
						data.user_id,
					);

					if (!existingTag) {
						const newTagId = await tagRepo.insert({
							name: tag.name,
							user_id: data.user_id,
						});
						if (newTagId) {
							existingTag = {
								tag_id: newTagId,
								name: tag.name,
								user_id: data.user_id,
							};
						}
					}

					if (existingTag?.tag_id) {
						await tagRepo.linkToRecipe(recipe_id, existingTag.tag_id);
					}
				}
			}

			await connexion.commit();
			return { success: true, recipe_id: recipe_id };
		} catch (error) {
			await connexion.rollback();
			return error;
		}
	};

	public update = async (
		data: Partial<Recipe>,
		requestingUserId: number,
	): Promise<unknown> => {
		if (!data.user_id || !data.recipe_id) return { error: "Missing IDs" };

		if (requestingUserId && requestingUserId !== data.user_id) {
			return { error: "Unauthorized: you don't own this recipe" };
		}

		const connexion = await new MySQLService().connect();

		try {
			await connexion.beginTransaction();

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

			await connexion.execute(sql, data);

			// delete et reinsert ingredients

			await connexion.execute(
				"DELETE FROM ingredient WHERE recipe_id = :recipe_id",
				{ recipe_id: data.recipe_id },
			);
			if (data.ingredients?.length) {
				for (const ingredient of data.ingredients) {
					await connexion.execute(
						"INSERT INTO ingredient (name, quantity, unit, recipe_id) VALUES (:name, :quantity, :unit, :recipe_id);",
						{ ...ingredient, recipe_id: data.recipe_id },
					);
				}
			}

			// delete and reinsert instructions

			await connexion.execute(
				"DELETE FROM instruction WHERE recipe_id = :recipe_id",
				{ recipe_id: data.recipe_id },
			);
			if (data.instructions?.length) {
				for (const instruction of data.instructions) {
					await connexion.execute(
						"INSERT INTO instruction (step_number, text, recipe_id) VALUES (:step_number, :text, :recipe_id);",
						{ ...instruction, recipe_id: data.recipe_id },
					);
				}
			}

			// delete and reinsert tags

			await connexion.execute(
				"DELETE FROM recipe_tag WHERE recipe_id = :recipe_id",
				{ recipe_id: data.recipe_id },
			);
			if (data.tags?.length) {
				const tagRepo = new TagRepository();

				for (const tag of data.tags) {
					let existingTag = await tagRepo.findByNameAndUser(
						tag.name,
						data.user_id,
					);

					if (!existingTag) {
						const newTagId = await tagRepo.insert({
							name: tag.name,
							user_id: data.user_id,
						});
						if (newTagId) {
							existingTag = {
								tag_id: newTagId,
								name: tag.name,
								user_id: data.user_id,
							};
						}
					}

					if (existingTag?.tag_id) {
						await tagRepo.linkToRecipe(data.recipe_id, existingTag.tag_id);
					}
				}
			}

			await connexion.commit();

			return { success: true };
		} catch (error) {
			await connexion.rollback();
			return error;
		}
	};

	public delete = async (
		data: Partial<Recipe>,
		requestingUserId?: number,
	): Promise<unknown> => {
		if (!data.recipe_id) return { error: "Missing recipe_id" };

		const connexion = await new MySQLService().connect();

		try {
			if (requestingUserId) {
				const [ownerCheck] = await connexion.execute(
					`SELECT user_id FROM ${process.env.MYSQL_DATABASE}.${this.table} WHERE recipe_id = :recipe_id`,
					{ recipe_id: data.recipe_id },
				);

				interface RecipeOwner {
					user_id: number;
				}

				const recipe = (ownerCheck as RecipeOwner[])[0];
				if (!recipe) {
					return { error: "Recipe not found" };
				}

				if (recipe.user_id !== requestingUserId) {
					return { error: "Unauthorized: you don't own this recipe" };
				}
			}

			await connexion.beginTransaction();

			const sql = `

			DELETE FROM
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.recipe_id = :recipe_id
			;
	    `;

			const [results] = await connexion.execute(sql, data);

			await connexion.commit();

			return results;
		} catch (error) {
			await connexion.rollback();

			return error;
		}
	};
}

export default RecipeRepository;
