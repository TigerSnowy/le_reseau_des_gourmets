import type Picture from "../model/picture.js";
import MySQLService from "../service/mysql_service.js";

class PictureRepository {
	private table = "picture";

	public selectAll = async (): Promise<Picture[] | unknown> => {
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

	public selectInList = async (list: string): Promise<Picture[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.picture_id IN (${list})
			;
        `;

		try {
			const [results] = await connexion.execute(sql);

			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Picture>,
	): Promise<Picture[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.picture_id = :picture_id
				;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			const result = (results as Picture[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	};

	public selectByRecipeId = async (
		recipe_id: number,
	): Promise<Picture[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			SELECT
				picture.*
			FROM
				${process.env.MYSQL_DATABASE}.recipe_picture
			JOIN
				${process.env.MYSQL_DATABASE}.picture
			ON
				recipe_picture.picture_id = picture.picture_id
			WHERE
				recipe_picture.recipe_id = :recipe_id
		`;

		try {
			const [results] = await connexion.execute(sql, { recipe_id });
			return results;
		} catch (error) {
			return error;
		}
	};
}
export default PictureRepository;
