import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";

class SecurityRepository {
	// nom de la table SQL
	private table = "user";

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

	// enregistrer un utilisateur
	public register = async (data: Partial<User>): Promise<User[] | unknown> => {
		const connexion = await new MySQLService().connect();

		const userData = data || {};

		if (!userData.profile_picture) {
			userData.profile_picture = this.getRandomDefaultAvatar();
			console.log(`Avatar attribué: ${userData.profile_picture}`);
		}

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

	// private isValidEmail(email: string): boolean {
	// 	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	// 	return emailRegex.test(email);
	// }
}
export default SecurityRepository;
