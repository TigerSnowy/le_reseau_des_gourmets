import type { Request, Response } from "express";
import SecurityRepository from "../repository/security_repository.js";
import argon2 from "argon2";
import UserRepository from "../repository/user_repository.js";
import type User from "../model/user.js";
import SimpleCrypto from "simple-crypto-js";
import jwt from "jsonwebtoken";

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

		// crypter le mot de passe et générer une partie aléatoire de la clé de décryptage
		const randomKey = SimpleCrypto.default.generateRandom();

		// clé de décryptage contenant la partie aléatoire et la partie fixe
		const key = `${process.env.KEY}${randomKey}`;

		// crypter le mot de passe
		const crypto = new SimpleCrypto.default(key);
		const passwordEncrypted = crypto.encrypt(req.body.password);

		console.log(passwordEncrypted);

		// status : code de status HTTP
		// json : formater une réponse en JSON

		res.status(200).json({
			status: 200,
			message: "Login successful",
			data: { ...user, password: passwordEncrypted, key: randomKey },
		});
	};

	// autorisation d'un utilisateur
	public auth = async (req: Request, res: Response) => {
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

		// recréer la clé de décryptage en récupérant la partie variable de la clé et la clé fixe
		const key = `${process.env.KEY}${req.body.key}`;

		// console.log(key);

		// décrypter le mot de passe
		const crypto = new SimpleCrypto.default(key);
		let passwordDecrypted: string;

		try {
			passwordDecrypted = crypto.decrypt(req.body.password) as string;
			console.log(passwordDecrypted);
		} catch (error) {
			res.status(401).json({
				status: 401,
				// afficher un simple message pour l'introduction, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : "Unauthorized",
			});
			// pour bloquer la suite du script
			return;
		}

		const passwordVerify = await argon2.verify(
			user.password,
			passwordDecrypted,
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

		// générer le JSON Web Token
		const token = jwt.sign({ user: req.body }, process.env.JWT_KEY as string, {
			expiresIn: process.env.NODE_ENV === "prod" ? 30 : 60 * 60 * 10,
		});

		console.log(token);

		res.status(200).json({
			status: 200,
			message: "User authenticated",
			data: {
				token: token,
			},
		});
	};
}

export default SecurityController;
