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
	public register = async (data: Partial<User>): Promise<unknown> => {
		const validationErrors = [];

		if (!data) validationErrors.push("Aucune donnée fournie");
		else {
			if (!data.pseudo) validationErrors.push("Le pseudo est requis");
			if (!data.surname) validationErrors.push("Le nom est requis");
			if (!data.first_name) validationErrors.push("Le prénom est requis");
			if (!data.email) validationErrors.push("L'email est requis");
			else if (!this.isValidEmail(data.email))
				validationErrors.push("Format d'email invalide");
			if (!data.password) validationErrors.push("Le mot de passe est requis");
			else if (data.password.length < 8)
				validationErrors.push(
					"Le mot de passe doit contenir au moins 8 caractères",
				);
		}

		if (validationErrors.length > 0) {
			return { error: validationErrors.join(", ") };
		}

		const userData: Partial<User> = {
			...data,
			profile_picture: data?.profile_picture || this.getRandomDefaultAvatar(),
			role_id: 2,
		};

		// connexion au serveur MySQL

		const connexion = await new MySQLService().connect();

		// requête SQL
		// SELECT school.* FROM le_reseau_des_gourmets_dev
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

	private isValidEmail(email: string): boolean {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}
}
export default SecurityRepository;
