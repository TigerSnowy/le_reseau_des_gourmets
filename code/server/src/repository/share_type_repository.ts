import type ShareType from "../model/share_type.js";
import MySQLService from "../service/mysql_service.js";

class ShareTypeRepository {
	private table = "share_type";

	public selectAll = async (): Promise<ShareType[] | unknown> => {
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

	public selectInList = async (
		list: string,
	): Promise<ShareType[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.share_type_id IN (${list})
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
		data: Partial<ShareType>,
	): Promise<ShareType[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.share_type_id = :share_type_id
				;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			const result = (results as ShareType[]).shift();

			return result;
		} catch (error) {
			return error;
		}
	};
}
export default ShareTypeRepository;
