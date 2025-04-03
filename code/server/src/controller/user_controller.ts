import type { Request, Response } from "express";
import UserRepository from "../repository/user_repository.js";

class UserController {
	public index = async (req: Request, res: Response) => {
		// récupérer tous les enregistrements
		const results = await new UserRepository().selectAll();

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
		const results = await new UserRepository().selectOne(req.params);

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

	public insert = async (req: Request, res: Response) => {
		// récupérer un enregistrement
		// req.params permet de récupérer les variables de route
		const results = await new UserRepository().insert(req.body);
		console.log(results);

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
			message: "User created",
			data: results,
		});
	};

	public update = async (req: Request, res: Response) => {
		// modifier un enregistrement
		// req.params permet de récupérer les variables de route
		const results = await new UserRepository().update(req.body);
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
			message: "User updated",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response) => {
		// modifier un enregistrement
		// req.params permet de récupérer les variables de route
		const results = await new UserRepository().delete(req.body);
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
			message: "User deleted",
			data: results,
		});
	};

	public updateAvatar = async (req: Request, res: Response) => {
		if (!req.body.user_id) {
			res.status(401).json({
				status: 401,
				message: "Unauthorized - User not authenticated",
			});
			return;
		}

		// récupérer l'utilisateur pour vérifier s'il existe et récupérer ses données
		const currentUser = await new UserRepository().selectOne({
			user_id: req.body.user_id,
		});

		if (!currentUser) {
			res.status(404).json({
				status: 404,
				message: "User not found",
			});
			return;
		}

		// mettre à jour l'avatar
		const results = await new UserRepository().updateAvatar(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Avatar updated succefully",
			data: { profile_picture: req.body.profile_picture },
		});
	};
}

export default UserController;
