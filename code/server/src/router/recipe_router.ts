import express, { type Request, type Response } from "express";
import RecipeController from "../controller/recipe_controller.js";

class RecipeRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new RecipeController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:recipe_id", new RecipeController().one);

		return this.router;
	};
}

export default RecipeRouter;
