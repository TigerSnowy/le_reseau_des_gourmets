import express, { type Request, type Response } from "express";
import RoleController from "../controller/role_controller.js";

class RoleRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new RoleController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:role_id", new RoleController().one);

		return this.router;
	};
}

export default RoleRouter;
