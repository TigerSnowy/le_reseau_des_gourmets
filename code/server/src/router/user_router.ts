import express, { type Request, type Response } from "express";
import UserController from "../controller/user_controller.js";

class UserRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new UserController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:user_id", new UserController().one);

		return this.router;
	};
}

export default UserRouter;
