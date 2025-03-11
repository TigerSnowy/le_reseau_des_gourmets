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
import cors from "cors";
import IngredientRouter from "../router/ingredient_router.js";
import PictureRouter from "../router/picture_router.js";
import PostRouter from "../router/post_router.js";
import RecipeRouter from "../router/recipe_router.js";
import UserRouter from "../router/user_router.js";
import ContactRouter from "../router/contact_router.js";

class Server {
	// propriétés
	private app: Express = express();
	private router: Router = express.Router();

	// constructeur

	constructor() {
		// gérer les requêtes multi-origines
		// CORS : Cross Origin Resource Sharing
		this.app.use(cors());

		// accéder au contenu d'une requête HTTP - proprété body - au format JSON
		this.app.use(express.json());

		//relier le routeur à l'application
		this.app.use(this.router);

		//liste des routeurs
		this.routersList();
	}

	// méthodes
	private routersList = () => {
		// préfixe de toutes les routes d'un routeur
		this.router.use("/", new HomepageRouter().getRoutes());

		this.router.use("/role", new RoleRouter().getRoutes());
		this.router.use("/ingredient", new IngredientRouter().getRoutes());
		this.router.use("/recipe_ingredient", new IngredientRouter().getRoutes());
		this.router.use("/picture", new PictureRouter().getRoutes());
		this.router.use("/recipe_picture", new PictureRouter().getRoutes());
		this.router.use("/post", new PostRouter().getRoutes());
		this.router.use("/recipe", new RecipeRouter().getRoutes());
		this.router.use("/user", new UserRouter().getRoutes());
		this.router.use("/contact", new ContactRouter().getRoutes());

		// routeur des routes inexistantes doit être obligatoirement en dernière position pour qu'il soit trouvé en dernier
		this.router.use("*", new NotFoundRouter().getRoutes());
	};

	// créer le serveur
	public create = () => {
		return http.createServer(this.app);
	};
}

export default Server;
