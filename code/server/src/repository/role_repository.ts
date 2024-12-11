import type Role from "../model/role.js";
import MySQLService from "../service/mysql_service.js";

class RoleRepository {
	// nom de la table SQL
	private table = "role";

	// récupérer tous les enregistrements
	// async crée une promesse
	// la fonction renvoir un objet unknown lorsqu'un erreur est renvoyée
	public selectAll = async (): Promise<Role[] | unknown> => {
		// connexion au serveur MySQL
		const connexion = await new MySQLService().connect();

		// requête SQL
		// SELECT school.* FROM le_reseau_des_gourmets_dev
		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table};
        `;

		// exécuter la requête
		// try / catch : permet d'exécuter une instruction (requête), et si l'instruction échoue, une erreur est récupérée
		try {
			// récupérer les résultats de la requête
			// results représente le premier indice du array renvoyé
			const [results] = await connexion.execute(sql);

			// si la requête a réussie
			return results;

		} catch (error) {
			// si la requête a échouée
			return error;
		}
	};

	// récupérer un enregistrement
	public selectOne = async (data: Partial<Role>): Promise<Role[] | unknown> => {
		// connexion au serveur MySQL
		const connexion = await new MySQLService().connect();

		// requête SQL
		// SELECT school.* FROM le_reseau_des_gourmets_dev WHERE role.role_id = 1;
		// créer une variable de requête SQL en préfixant le nom d'une variable par :
		const sql = `
            SELECT
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
				${this.table}.role_id = :role_id
				;
        `;

		// exécuter la requête
		// try / catch : permet d'exécuter une instruction (requête), et si l'instruction échoue, une erreur est récupérée
		try {
			// récupérer les résultats de la requête
			// results représente le premier indice du array renvoyé
			// requêtes préparées avec des variables de requêtes SQL permettent d'éviter les injections SQL
			// data(non modifiable) permet de définir une valeur aux variables de requêtes SQL
			const [results] = await connexion.execute(sql, data);

			// récupérer le premier résultat
			// shift permet de récupérer le premier indice d'un array
			const result = (results as Role[]).shift();

			// si la requête a réussie
			return result;

		} catch (error) {
			// si la requête a échouée
			return error;
		}
	};
}
export default RoleRepository;
