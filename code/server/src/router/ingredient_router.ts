import express, { type Request, type Response } from "express";
import IngredientController from "../controller/ingredient_controller.js";
import AuthorizationMiddleware from "../middleware/authorization_middleware.js";

class IngredientRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new IngredientController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:ingredient_id", new IngredientController().one);
		this.router.get("/recipe/:recipe_id", new IngredientController().byRecipe);

		this.router.post(
			"/",
			new AuthorizationMiddleware().check(["admin", "user"]),
			new IngredientController().insert,
		);

		this.router.put(
			"/",
			new AuthorizationMiddleware().check(["admin", "user"]),
			new IngredientController().update,
		);

		this.router.delete(
			"/",
			new AuthorizationMiddleware().check(["admin", "user"]),
			new IngredientController().delete,
		);

		return this.router;
	};
}

export default IngredientRouter;
