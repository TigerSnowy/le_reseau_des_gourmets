import express, { type Request, type Response } from "express";
import IngredientController from "../controller/ingredient_controller.js";

class IngredientRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new IngredientController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:ingredient_id", new IngredientController().one);

		return this.router;
	};
}

export default IngredientRouter;
