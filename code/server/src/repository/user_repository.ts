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
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.user_recipe_type
			ON
				user_recipe_type.user_id =  ${this.table}.user_id
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.recipe
			ON
				user_recipe_type.recipe_id = recipe.recipe_id
			LEFT JOIN
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

	//créer un enregistrement
	public insert = async (data: Partial<User>): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		//créer ne variable de requête SQL en préfixant le nom d'une variable par :
		const sql = `

			INSERT INTO 
				${process.env.MYSQL_DATABASE}.${this.table}
			VALUES
				(
					NULL,
					:pseudo,
					:surname,
					:first_name,
					:email,
					:password,
					:profile_picture,
					:profile_background,
					:subscription_date,
					:role_id
				)
			;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			return results;
		} catch (error) {
			return error;
		}
	};

	// modifier un enregistrement
	public update = async (data: Partial<User>): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		//créer une variable de requête SQL en préfixant le nom d'une variable par :
		const sql = `

			UPDATE 
				${process.env.MYSQL_DATABASE}.${this.table}
			SET
				${this.table}.pseudo = :pseudo,
				${this.table}.surname = :surname,
				${this.table}.first_name = :first_name,
				${this.table}.email = :email,
				${this.table}.password = :password,
				${this.table}.profile_picture = :profile_picture,
				${this.table}.profile_background = :profile_background,
				${this.table}.subscription_date = :subscription_date,
				${this.table}.role_id = :role_id
			WHERE
				${this.table}.user_id = :user_id
			;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			return results;
		} catch (error) {
			return error;
		}
	};

	public delete = async (data: Partial<User>): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		//créer une variable de requête SQL en préfixant le nom d'une variable par :
		const sql = `

			DELETE FROM 
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.user_id = :user_id
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
export default UserRepository;
