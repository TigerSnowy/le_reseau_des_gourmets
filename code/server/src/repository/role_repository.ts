import MySQLService from "../service/mysql_service.js";

class RoleRepository {
	// nom de la table SQL
	private table = "role";

	// récupérer tous les enregistrements
	public selectAll = async () => {
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
			const results = await connexion.execute(sql);

			// si la requête a réussie
			return results;

		} catch (error) {
			// si la requête a échouée
			return error;
		}
	};
}

export default RoleRepository;
