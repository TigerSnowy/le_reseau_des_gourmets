import type User from "../model/user.js";
import type Role from "../model/role.js";
import MySQLService from "../service/mysql_service.js";
import RoleRepository from "./role_repository.js";

class UserRepository {
	private table = "user";

	public selectAll = async (): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table};
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
}
export default UserRepository;
