// promise (promesse) : exécution d'un code asynchrone
import mysql, { type PoolConnection } from "mysql2/promise";

class MySQLService {
	// membres (propriété et méthodes) statiques
	// membres qui sont accessibles non pas avec un objet mais directement par la classe

	public static connection: PoolConnection;

	// async permet de créer une fonction asyncgrone
	public connect = async () => {

		// tester si une connection n'existe pas
		// await : à utiliser avec du code asynchrone (promise);
		// créer un temps d'attente dans l'exécution du code;
		// récupérer le contenu d'une promesse

		if (!MySQLService.connection) {
			return await mysql
				.createPool({
					host: process.env.MYSQL_HOST,
					user: process.env.MYSQL_USER,
					password: process.env.MYSQL_PASSWORD,
					database: process.env.MYSQL_DATABASE,
					namedPlaceholders: true,
				})
				.getConnection();
		}

		// si la connexion existe
		return MySQLService.connection;
	};
}

export default MySQLService;
