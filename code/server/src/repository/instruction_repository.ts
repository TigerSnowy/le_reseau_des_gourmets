import type Instruction from "../model/instruction.js";
import MySQLService from "../service/mysql_service.js";

class InstructionRepository {
	private table = "instruction";

	public selectAll = async (): Promise<Instruction[] | unknown> => {
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

	public selectOne = async (
		data: Partial<Instruction>,
	): Promise<Instruction | null> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			SELECT
				${this.table}.*
			FROM 
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.instruction_id = :instruction_id;
		`;

		try {
			const [results] = await connexion.execute(sql, data);
			const result = (results as Instruction[]).shift();
			return result || null;
		} catch (error) {
			return null;
		}
	};

	// récupérer toutes les instructions d'une recette
	public selectByRecipeId = async (
		recipe_id: number,
	): Promise<Instruction[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			SELECT
				${this.table}.*
			FROM 
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.recipe_id = :recipe_id
			ORDER BY
				${this.table}.step_number ASC;
		`;

		try {
			const [results] = await connexion.execute(sql, { recipe_id });
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default InstructionRepository;
