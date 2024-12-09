import express, {
	type Router,
	type Express,
	type Request,
	type Response,
} from "express";

import http from "node:http";
import HomepageRouter from "../router/homepage_router.js";
import NotFoundRouter from "../router/not_found_router.js";
import RoleRouter from "../router/role_router.js";

class Server {
	// propriétés
	private app: Express = express();
	private router: Router = express.Router();

	// constructeur

	constructor() {
		//relier le routeur à l'application
		this.app.use(this.router);

		//liste des routeurs
		this.routersList();
	}

	// méthodes
	private routersList = () => {
		// préfixe de toutes les routes d'un routeur 
		this.router.use('/', new HomepageRouter().getRoutes());

		this.router.use('/role', new RoleRouter().getRoutes());

		// routeur des routes inexistantes doit être obligatoirement en dernière position pour qu'il soit trouvé en dernier
		this.router.use('*', new NotFoundRouter().getRoutes());
		};

	// créer le serveur
	public create = () => {
		return http.createServer(this.app);
	};

}

export default Server;
