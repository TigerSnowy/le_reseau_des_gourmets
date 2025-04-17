import express, { type Request, type Response } from "express";
import AuthorizationMiddleware from "../middleware/authorization_middleware.js";
import InstructionController from "../controller/instruction_controller.js";

class InstructionRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new InstructionController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:instruction_id", new InstructionController().selectOne);
		this.router.get(
			"/recipe/:recipe_id",
			new InstructionController().selectByRecipeId,
		);

		this.router.post(
			"/",
			new AuthorizationMiddleware().check(["admin", "user"]),
			new InstructionController().insert,
		);

		this.router.put(
			"/",
			new AuthorizationMiddleware().check(["admin", "user"]),
			new InstructionController().update,
		);

		this.router.delete(
			"/",
			new AuthorizationMiddleware().check(["admin", "user"]),
			new InstructionController().delete,
		);

		return this.router;
	};
}

export default InstructionRouter;
