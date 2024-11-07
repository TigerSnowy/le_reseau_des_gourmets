import express, {
	type Router,
	type Express,
	type Request,
	type Response,
} from "express";

import http from "node:http";
import HomepageRouter from "../router/homepage_router";
import NotFoundRouter from "../router/not_found_router";

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
		// préfixe à toutes les routes 
		this.router.use('/', new HomepageRouter().getRoutes());

		// routeur des routes inexistantes doit être obligatoirement en dernière position
		this.router.use('*', new NotFoundRouter().getRoutes());
		};

	// créer le serveur
	public create = () => {
		return http.createServer(this.app);
	};

}

export default Server;
