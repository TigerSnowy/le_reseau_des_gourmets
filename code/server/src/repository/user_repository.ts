import type User from "../model/user.js";
import type Role from "../model/role.js";
import MySQLService from "../service/mysql_service.js";
import RoleRepository from "./role_repository.js";
import ShareTypeRepository from "./share_type_repository.js";
import type ShareType from "../model/share_type.js";
import type Recipe from "../model/recipe.js";
import RecipeRepository from "./recipe_repository.js";

class UserRepository {
	private table = "user";

	public selectAll = async (): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*,
				GROUP_CONCAT(recipe.recipe_id) AS recipe_share_ids,
				GROUP_CONCAT(share_type.share_type_id) AS share_type_ids
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN
				${process.env.MYSQL_DATABASE}.user_recipe_type
			ON
				user_recipe_type.user_id =  ${this.table}.user_id
			JOIN
				${process.env.MYSQL_DATABASE}.recipe
			ON
				user_recipe_type.recipe_id = recipe.recipe_id
			JOIN
				${process.env.MYSQL_DATABASE}.share_type
			ON
				share_type.share_type_id = 	user_recipe_type.share_type_id
			GROUP BY
				${this.table}.user_id
			;
        `;

		try {
			const [results] = await connexion.execute(sql);

			for (let i = 0; i < (results as User[]).length; i++) {
				const result = (results as User[])[i];

				result.role = (await new RoleRepository().selectOne({
					role_id: result.role_id,
				})) as Role;

				result.share_type = (await new ShareTypeRepository().selectInList(
					result.share_type_ids,
				)) as ShareType[];
			}

			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (data: Partial<User>): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.user_id = :user_id
				;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			const result = (results as User[]).shift() as User;

			result.role = (await new RoleRepository().selectOne({
				role_id: result.role_id,
			})) as Role;

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default UserRepository;
