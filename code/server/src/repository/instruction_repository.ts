import type Instruction from "../model/instruction.js";
import MySQLService from "../service/mysql_service.js";

type InsertResult = {
	insertId: number;
	affectedRows: number;
};

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

	public insert = async (
		data: Partial<Instruction>,
	): Promise<number | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			INSERT INTO
				${process.env.MYSQL_DATABASE}.${this.table} (step_number, text, recipe_id)
			VALUES
				(:step_number, :text, :recipe_id);
		`;

		try {
			const [result] = await connexion.execute(sql, data);
			return (result as InsertResult).insertId;
		} catch (error) {
			return error;
		}
	};

	public update = async (data: Partial<Instruction>): Promise<unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			UPDATE
				${process.env.MYSQL_DATABASE}.${this.table}
			SET
				step_number = :step_number,
				text = :text
			WHERE
				instruction_id = :instruction_id;
		`;

		try {
			const [result] = await connexion.execute(sql, data);
			return result;
		} catch (error) {
			return error;
		}
	};

	public delete = async (data: Partial<Instruction>): Promise<unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			DELETE FROM
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				instruction_id = :instruction_id;
		`;

		try {
			const [result] = await connexion.execute(sql, data);
			return result;
		} catch (error) {
			return error;
		}
	};
}

export default InstructionRepository;
