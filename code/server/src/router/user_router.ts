import express, { type Request, type Response } from "express";
import UserController from "../controller/user_controller.js";
import multer from "multer";
import UserfileMiddleware from "../middleware/user_file_middleware.js";
import AuthorizationMiddleware from "../middleware/authorization_middleware.js";

class UserRouter {
	// propriétés
	private router = express.Router();

	// dossier de destination des fichiers transférés
	private upload = multer({ dest: `${process.env.ASSET_DIR}/img` });

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new UserController().index);

		// créer une variable de route en la préfixant d'un :
		this.router.get("/:user_id", new UserController().one);

		this.router.post(
			"/",
			new AuthorizationMiddleware().check(["admin"]),
			this.upload.any(),
			new UserfileMiddleware().process,
			new UserController().insert,
		);
		this.router.put(
			"/",
			this.upload.any(),
			new UserfileMiddleware().process,
			new UserController().update,
		);
		this.router.delete(
			"/",
			this.upload.any(),
			new UserfileMiddleware().process,
			new UserController().delete,
		);

		return this.router;
	};
}

export default UserRouter;
