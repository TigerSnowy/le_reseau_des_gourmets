import type { Request, Response } from "express";
import IngredientRepository from "../repository/ingredient_repository.js";
import Ingredient from "../model/ingredient.js";
import User from "../model/user.js";

class IngredientController {
	public index = async (req: Request, res: Response) => {
		// récupérer tous les enregistrements
		const results = await new IngredientRepository().selectAll();

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
		const results = await new IngredientRepository().selectOne(req.params);

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

	public byRecipe = async (req: Request, res: Response) => {
		// vérifier la présence de recipe_id
		if (!req.params.recipe_id) {
			res.status(400).json({
				status: 400,
				message: "Missing recipe_id parameter",
			});
			return;
		}

		// convertir en nombre
		const recipeId = Number.parseInt(req.params.recipe_id as string, 10);

		// récupérer les ingrédients d'une recette
		const results = await new IngredientRepository().selectByRecipeId(recipeId);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// bloquer la suite du script
			return;
		}

		res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	};

	public insert = async (req: Request, res: Response) => {
		// vérifier la présence des champs obligatoires
		if (!req.body.name || !req.body.recipe_id) {
			res.status(400).json({
				status: 400,
				message: "Missing required fields (name, recipe_id)",
			});
			return;
		}

		// insérer un nouvel ingrédient
		const results = await new IngredientRepository().insert(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// bloquer la suite du script
			return;
		}
		res.status(201).json({
			status: 201,
			message: "Ingredient created",
			data: results,
		});
	};

	public update = async (req: Request, res: Response) => {
		// vérifier la présence des champs obligatoires
		if (!req.body.ingredient_id || !req.body.name) {
			res.status(400).json({
				status: 400,
				message: "Missing required fields (ingredient_id, name)",
			});
			return;
		}
		// mettre à jour un ingrédient
		const results = await new IngredientRepository().update(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Ingredient updated",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response) => {
		// vérifier la présence de l'id
		if (!req.body.ingredient_id) {
			res.status(400).json({
				status: 400,
				message: "Missing ingredient_id",
			});
			return;
		}

		// supprimer un ingrédient
		const results = await new IngredientRepository().delete(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Ingredient deleted",
			data: results,
		});
	};
}

export default IngredientController;
