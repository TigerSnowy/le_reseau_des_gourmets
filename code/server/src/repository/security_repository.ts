import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";

class SecurityRepository {
	// nom de la table SQL
	private table = "user";

	// enregistrer un utilisateur
	public register = async (data: Partial<User>): Promise<User[] | unknown> => {
		// connexion au serveur MySQL
		const connexion = await new MySQLService().connect();

		const profilePictureValue = data.profile_picture
			? "profile_picture,"
			: "NULL";

		// requête SQL
		// SELECT school.* FROM le_reseau_des_gourmets_dev
		const sql = `
            INSERT INTO
                ${process.env.MYSQL_DATABASE}.${this.table}
            VALUE
                (
				NULL,
					:pseudo,
					:surname,
					:first_name,
					:email,
					:password,
					${profilePictureValue},
					2
				)
			;
        `;

		// exécuter la requête
		// try / catch : permet d'exécuter une instruction (requête), et si l'instruction échoue, une erreur est récupérée
		try {
			// récupérer les résultats de la requête
			// results représente le premier indice du array renvoyé
			const [results] = await connexion.execute(sql, data);

			// si la requête a réussie
			return results;
		} catch (error) {
			// si la requête a échouée
			return error;
		}
	};
}
export default SecurityRepository;
