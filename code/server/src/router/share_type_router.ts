import express, { type Request, type Response } from "express";
import ShareTypeController from "../controller/share_type_controller.js";

class ShareTypeRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new ShareTypeController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:share_type_id", new ShareTypeController().one);

		return this.router;
	};
}

export default ShareTypeRouter;
