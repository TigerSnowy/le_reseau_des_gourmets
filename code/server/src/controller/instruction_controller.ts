import type { Request, Response } from "express";
import InstructionRepository from "../repository/instruction_repository.js";
import IngredientRepository from "../repository/ingredient_repository.js";

class InstructionController {
	public index = async (req: Request, res: Response) => {
		// récupérer tous les enregistrements
		const results = await new InstructionRepository().selectAll();

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

	public selectOne = async (req: Request, res: Response) => {
		// récupérer un enregistrement
		// req.params permet de récupérer les variables de route
		const results = await new InstructionRepository().selectOne(req.params);

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

	public selectByRecipeId = async (req: Request, res: Response) => {
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
		const results = await new InstructionRepository().selectByRecipeId(
			recipeId,
		);

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
		if (!req.body.text || !req.body.recipe_id) {
			res.status(400).json({
				status: 400,
				message: "Missing required fields (text, recipe_id)",
			});
			return;
		}

		// insérer un nouvelle instruction
		const results = await new InstructionRepository().insert(req.body);

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
			message: "Instruction created",
			data: results,
		});
	};

	public update = async (req: Request, res: Response) => {
		// vérifier la présence des champs obligatoires
		if (!req.body.instruction_id || !req.body.text) {
			res.status(400).json({
				status: 400,
				message: "Missing required fields (instruction_id, text)",
			});
			return;
		}
		// mettre à jour une instruction
		const results = await new InstructionRepository().update(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Instruction updated",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response) => {
		// vérifier la présence de l'id
		if (!req.body.instruction_id) {
			res.status(400).json({
				status: 400,
				message: "Missing instruction_id",
			});
			return;
		}

		// supprimer un ingrédient
		const results = await new InstructionRepository().delete(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Instruction deleted",
			data: results,
		});
	};
}

export default InstructionController;
