import type User from "../model/user.js";
import type Role from "../model/role.js";
import MySQLService from "../service/mysql_service.js";
import RoleRepository from "./role_repository.js";

class UserRepository {
	private table = "user";

	// si profile_picture est vide, on le met à NULL explicitement
	private getRandomDefaultAvatar = (): string => {
		const defaultAvatars = [
			"/img/default_avatars/chocolat.jpg",
			"/img/default_avatars/cookies.jpg",
			"/img/default_avatars/kiwi.jpg",
			"/img/default_avatars/lasagna.jpg",
			"/img/default_avatars/lollipop.jpg",
			"/img/default_avatars/pizza.jpg",
			"/img/default_avatars/strawberries.jpg",
		];

		// sélection aléatoire
		const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
		return defaultAvatars[randomIndex];
	};

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

				if (result?.role_id) {
					result.role = (await new RoleRepository().selectOne({
						role_id: result.role_id,
					})) as Role;
				}

				// result.role = (await new RoleRepository().selectOne({
				// 	role_id: result.role_id,
				// })) as Role;
			}

			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (data: Partial<User>): Promise<User | null> => {
		if (!data || !data.user_id) return null;

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

			if (!results || !(results as User[]).length) return null;

			const result = (results as User[]).shift() as User;

			// if (!result) return null;

			if (result?.role_id) {
				result.role = (await new RoleRepository().selectOne({
					role_id: result.role_id,
				})) as Role;
			}

			// result.role = (await new RoleRepository().selectOne({
			// 	role_id: result.role_id,
			// })) as Role;

			return result;
		} catch (error) {
			return null;
		}
	};

	public selectOneByEmail = async (email: string): Promise<User | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.email = :email
				;
        `;

		try {
			const [results] = await connexion.execute(sql, {
				email,
			});

			const result = (results as User[]).shift() as User;

			return result;
		} catch (error) {
			return error;
		}
	};

	//créer un enregistrement
	public insert = async (data: Partial<User>): Promise<User[] | unknown> => {
		// vérifie que data existe
		const userData = data || {};

		// applique un avatar par défaut
		if (!userData.profile_picture) {
			userData.profile_picture = this.getRandomDefaultAvatar();
			console.log(`Avatar attribué: ${userData.profile_picture}`);
		}

		// définit un rôle par défaut
		if (!userData.role_id) {
			userData.role_id = 2;
		}

		const connexion = await new MySQLService().connect();

		// const profilePictureValue = data.profile_picture
		// 	? "profile_picture,"
		// 	: "NULL";

		// créer une variable qui teste profile_picture
		// si profile_picture possède une valeur > :profile_picture, sinon > NULL
		// insérer la variable dans la requête

		//créer ne variable de requête SQL en préfixant le nom d'une variable par :
		const sql = `

			INSERT INTO 
				${process.env.MYSQL_DATABASE}.${this.table}
			(
				user_id,
				pseudo,
				surname,
				first_name,
				email,
				password,
				profile_picture,
				role_id
			)
			VALUES
			(
				NULL,
				:pseudo,
				:surname,
				:first_name,
				:email,
				:password,
				:profile_picture,
				:role_id
			)
			;
        `;

		try {
			const [results] = await connexion.execute(sql, data);

			return results;
		} catch (error) {
			console.error(error);
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

	public updateAvatar = async (
		data: Partial<User>,
	): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
			UPDATE
				${process.env.MYSQL_DATABASE}.${this.table}
			SET
				${this.table}.profile_picture = :profile_picture
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

	public checkPseudoExists = async (
		// si excludeUserId est fourni, on exclut cet utilisateur de la vérification, sinon on vérifie simplement si le pseudo existe
		pseudo: string,
		excludeUserId?: number,
	): Promise<boolean> => {
		const connexion = await new MySQLService().connect();

		// sinon, on vérifie simplement si le pseudo existe
		// on utilise une requête préparée pour éviter les injections SQL
		const sql = excludeUserId
			? `SELECT COUNT(*) as count FROM ${process.env.MYSQL_DATABASE}.${this.table} 
		 WHERE ${this.table}.pseudo = :pseudo AND ${this.table}.user_id != :user_id`
			: `SELECT COUNT(*) as count FROM ${process.env.MYSQL_DATABASE}.${this.table} 
		 WHERE ${this.table}.pseudo = :pseudo`;

		const params = excludeUserId
			? { pseudo, user_id: excludeUserId }
			: { pseudo };

		try {
			const [results] = await connexion.execute(sql, params);
			const count = (results as [{ count: number }])[0].count;
			return count > 0;
		} catch (error) {
			console.error("Error checking pseudo:", error);
			return true;
			// en cas d'erreur, on suppose que le pseudo existe déjà (par sécurité)
		}
	};

	// ajous d'une méthode pour mettre à jour uniquement le pseudo
	public updatePseudo = async (
		userId: number,
		newPseudo: string,
	): Promise<unknown> => {
		const connexion = await new MySQLService().connect();

		const sql = `
	  UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
	  SET ${this.table}.pseudo = :pseudo
	  WHERE ${this.table}.user_id = :user_id
	`;

		try {
			const [results] = await connexion.execute(sql, {
				pseudo: newPseudo,
				user_id: userId,
			});
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default UserRepository;
