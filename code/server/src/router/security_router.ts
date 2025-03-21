import express, { type Request, type Response } from "express";
import SecurityController from "../controller/security_controller.js";

class SecurityRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.post("/register", new SecurityController().register);
		this.router.post("/login", new SecurityController().login);

		return this.router;
	};
}

export default SecurityRouter;
