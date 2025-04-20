import type { Request, Response } from "express";
import RecipeRepository from "../repository/recipe_repository.js";
import Recipe from "../model/recipe.js";
import type User from "../model/user.js";

class RecipeController {
	public index = async (req: Request, res: Response): Promise<void> => {
		const userId = req.query.user_id ? Number(req.query.user_id) : undefined;

		console.log("Requête de recettes pour user_id:", userId);

		// récupérer tous les enregistrements filtrés par user_id
		const results = await new RecipeRepository().selectAll(userId);

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

	public one = async (req: Request, res: Response): Promise<void> => {
		// récupérer un enregistrement
		// req.params permet de récupérer les variables de route
		const results = await new RecipeRepository().selectOne(req.params);

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

	public insert = async (req: Request, res: Response): Promise<void> => {
		// récupérer un enregistrement
		// req.params permet de récupérer les variables de route
		const results = await new RecipeRepository().insert(req.body);

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

		res.status(201).json({
			status: 201,
			message: "Recipe created",
			data: results,
		});
	};

	public update = async (req: Request, res: Response): Promise<void> => {
		// récupérer un enregistrement
		// req.params permet de récupérer les variables de route
		// const requestingUserId = (req as Request & { user?: User }).user?.user_id;
		const requestingUserId = req.body.user_id;

		if (!requestingUserId) {
			res.status(401).json({
				status: 401,
				message: "Unauthorized - Missing user_id",
			});
			return;
		}
		const results = await new RecipeRepository().update(
			req.body,
			requestingUserId,
		);
		// console.log(results);

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
			message: "Recipe updated",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response): Promise<void> => {
		// récupérer un enregistrement
		// req.params permet de récupérer les variables de route
		const results = await new RecipeRepository().delete(req.body);
		// console.log(results);

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
			message: "Recipe deleted",
			data: results,
		});
	};
}

export default RecipeController;
