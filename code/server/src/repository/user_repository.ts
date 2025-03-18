import type User from "../model/user.js";
import type Role from "../model/role.js";
import MySQLService from "../service/mysql_service.js";
import RoleRepository from "./role_repository.js";
import type Recipe from "../model/recipe.js";
import RecipeRepository from "./recipe_repository.js";

class UserRepository {
	private table = "user";

	public selectAll = async (): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*,
				GROUP_CONCAT(recipe.recipe_id) AS recipe_ids
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN
				${process.env.MYSQL_DATABASE}.recipe
			ON
				${this.table}.user_id = recipe.user_id
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

		const profilePictureValue = data.profile_picture
			? "profile_picture,"
			: "NULL";

		// créer une variable qui teste profile_picture
		// si profile_picture possède une valeur > :profile_picture, sinon > NULL
		// insérer la variable dans la requête

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
					${profilePictureValue},
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
