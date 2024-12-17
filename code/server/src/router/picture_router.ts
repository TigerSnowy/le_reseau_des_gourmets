import express, { type Request, type Response } from "express";
import PictureController from "../controller/picture_controller.js";

class PictureRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		this.router.get("/", new PictureController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:picture_id", new PictureController().one);

		return this.router;
	};
}

export default PictureRouter;
