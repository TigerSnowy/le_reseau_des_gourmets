import type { Request, Response } from "express";
import SecurityRepository from "../repository/security_repository.js";
import argon2 from "argon2";
import UserRepository from "../repository/user_repository.js";
import type User from "../model/user.js";

// quel est le but d'un
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

	public login = async (req: Request, res: Response) => {
		// récupérer un utilisateur par son email
		const results = await new UserRepository().selectOneByEmail(req.body.email);

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

		// si l'utilisateur n'existe pas

		if (!results) {
			res.status(403).json({
				status: 403,
				// afficher un simple message pour l'introduction, sinon afficher l'erreur
				message:
					process.env.NODE_ENV === "prod" ? "Error" : "User does not exist",
			});
			// pour bloquer la suite du script
			return;
		}

		const user = await new UserRepository().selectOne(results as User);

		// vérifie si l'utilisateur est null avant d'accéder aux propriétés
		if (!user) {
			res.status(403).json({
				status: 403,
				message: process.env.NODE_ENV === "prod" ? "Error" : "User not found",
			});
			return;
		}

		const passwordVerify = await argon2.verify(
			user.password,
			req.body.password,
		);

		if (!passwordVerify) {
			res.status(403).json({
				status: 403,
				// afficher un simple message pour l'introduction, sinon afficher l'erreur
				message:
					process.env.NODE_ENV === "prod" ? "Error" : "Incorrect password",
			});
			// pour bloquer la suite du script
			return;
		}

		// status : code de status HTTP
		// json : formater une réponse en JSON

		res.status(200).json({
			status: 200,
			message: "Login successful",
			data: user,
		});
	};
}

export default SecurityController;
