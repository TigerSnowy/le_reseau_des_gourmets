import type { Request, Response } from "express";
import PictureRepository from "../repository/picture_repository.js";
import Picture from "../model/picture.js";

class PictureController {
	public index = async (req: Request, res: Response) => {
		// récupérer tous les enregistrements
		const results = await new PictureRepository().selectAll();

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				// afficher un imple message pour l'introduction, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// pour bloquer la suite du script
			return;
		}

		// status : code de status HTTP
		// json : formater une réponse en JSON

		res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	};

	public one = async (req: Request, res: Response) => {
		// récupérer un enregistrement
		// req.params permet de récupérer les variables de route
		const results = await new PictureRepository().selectOne(req.params);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// bloquer la suite du script
			return;
		}

		// status : code de status HTTP
		// json : formater une réponse en JSON

		res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	};

	public upload = async (req: Request, res: Response): Promise<void> => {
		try {
			const file = req.file;
			const { recipe_id } = req.body;
			if (!file || !recipe_id) {
				res
					.status(400)
					.json({ success: false, message: "image & recipe_id requis" });
				return;
			}

			const picRepo = new PictureRepository();
			const pictureResult = await picRepo.insert({ filename: file.filename });

			// lier recette/image dans recipe_picture
			await picRepo.linkToRecipe(Number(recipe_id), pictureResult.picture_id);

			res.status(201).json({
				success: true,
				data: {
					picture_id: pictureResult.picture_id,
					image: file.filename,
				},
			});
		} catch (err) {
			console.error("Erreur upload image recette :", err);
			res.status(500).json({ success: false, message: "Erreur serveur" });
		}
	};
}

export default PictureController;
