import type { Request, Response } from "express";
import SecurityRepository from "../repository/security_repository.js";
import argon2 from "argon2";

class SecurityController {
	public register = async (req: Request, res: Response) => {
		// enregistrer un utilisateur
		// hacher le mot de passe
		const results = await new SecurityRepository().register({
			...req.body,
			password: await argon2.hash(req.body.password),
		});

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

		res.status(201).json({
			status: 201,
			message: "User created",
			data: results,
		});
	};
}

export default SecurityController;
