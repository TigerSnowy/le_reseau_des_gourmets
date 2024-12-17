import type Post from "../model/post.js";
import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";
import UserRepository from "./user_repository.js";

class PostRepository {
	private table = "post";

	public selectAll = async (): Promise<Post[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table};
        `;

		try {
			const [results] = await connexion.execute(sql);

			for (let i = 0; i < (results as Post[]).length; i++) {
				const result = (results as Post[])[i];

				result.user = (await new UserRepository().selectOne({
					user_id: result.user_id,
				})) as User;
			}

			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (data: Partial<Post>): Promise<Post[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.post_id = :post_id
				;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			const result = (results as Post[]).shift() as Post;

			result.user = (await new UserRepository().selectOne({
				user_id: result.user_id,
			})) as User;

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default PostRepository;
