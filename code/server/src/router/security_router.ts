import express, { type Request, type Response } from "express";
import SecurityController from "../controller/security_controller.js";
import RegisterFormValidatorMiddlware from "../middleware/register_form_validator_middleware.js";

class SecurityRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.post(
			"/register",
			new RegisterFormValidatorMiddlware().validate,
			new SecurityController().register,
		);
		this.router.post("/login", new SecurityController().login);
		this.router.post("/auth", new SecurityController().auth);

		return this.router;
	};
}

export default SecurityRouter;
