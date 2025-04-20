import express, { type Request, type Response } from "express";
import PictureController from "../controller/picture_controller.js";
import multer from "multer";
import UserfileMiddleware from "../middleware/user_file_middleware.js";
import path from "node:path";
import crypto from "node:crypto";

class PictureRouter {
	// propriétés
	private router = express.Router();

	// méthodes
	public getRoutes = () => {
		const storage = multer.diskStorage({
			destination: path.join(process.env.ASSET_DIR as string, "img"),
			filename: (_req, file, cb) => {
				const ext = path.extname(file.originalname);
				const name = crypto.randomBytes(16).toString("hex") + ext;
				cb(null, name);
			},
		});

		const upload = multer({ storage });

		this.router.get("/", new PictureController().index);
		// créer une variable de route en la préfixant d'un :
		this.router.get("/:picture_id", new PictureController().one);

		this.router.post(
			"/",
			upload.single("image"),
			new PictureController().upload,
		);

		return this.router;
	};
}

export default PictureRouter;
