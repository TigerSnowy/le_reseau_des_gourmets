import type { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";
import UserRepository from "../repository/user_repository.js";
import type User from "../model/user.js";

class UserfileMiddleware {
	public process = async (req: Request, res: Response, next: NextFunction) => {
		console.log("user file middleware starting");
		console.log("req.file:", req.file);
		console.log("req.files:", req.files);
		console.log("req.body:", req.body);
		// console.log("user file middleware");

		const files = req.files as Express.Multer.File[] | undefined;
		const file = files && files.length > 0 ? files[0] : undefined;

		// console.log(req.body);
		// console.log(req.files);

		// récupérer le fichier transféré
		// const file = (req.files as Express.Multer.File[])[0];

		// récupérer le fichier transféré
		let user: User | null = null;
		if (req?.body.user_id) {
			const result = await new UserRepository().selectOne(req.body);
			user = result as User;
		}
		// const user = await new UserRepository().selectOne(req.body);

		// si un fichier a été sélectionné
		if (file) {
			console.log("Processing file:", file);
			// créé le nom final du fichier en y ajoutant son extension
			const filename = `${file.filename}.${file.mimetype.split("/")[1]}`;

			// console.log(filename);

			// renomme le fichier transféré
			await fs.rename(file.path, `${file.destination}/${filename}`);

			console.log("File renamed to:", filename);
			console.log("Final req.body:", req.body);

			// remplir la propriété de body en relation avec le ficheir
			req.body[file.fieldname] = filename;

			// récupérer la méthode HTTP
			// si une modification est effectuée, supprimer l'ancien  fichier
			if (req.method === "PUT" && user && user.profile_picture) {
				try {
					await fs.rm(`${file.destination}/${user.profile_picture}`);
				} catch (err) {
					console.error(
						"Erreur lors de la suppression de l'ancien fichier:",
						err,
					);
				}
			}
		}

		// si aucun fichier n'a été sélectionné
		else {
			// PUT > récupérer le nom de l'ancienn image et l'affecter à la propriété gérant le fichier
			if (req.method === "PUT" && user) {
				req.body.profile_picture = user.profile_picture;
			}

			// DELETE > supprimer le fichier
			else if (req.method === "DELETE" && user && user.profile_picture) {
				const filePath = `${process.env.ASSET_DIR}/img/${user.profile_picture}`;
				try {
					// vérifie si le fichier est accessible
					await fs.access(filePath);
					await fs.rm(filePath);
					console.log("Image supprimée avec succès !");
				} catch (err: unknown) {
					const error = err as NodeJS.ErrnoException;
					if (error.code === "ENOENT") {
						console.log("Le fichier n'existe pas, saoule pas !");
					} else {
						console.error("Erreur de la suppression de l'image:", error);
					}
				}
			}

			// if (req.method === "DELETE") {
			// 	await fs.rm(
			// 		`${process.env.ASSET_DIR}/img/${(user as User).profile_picture}`,
			// 	);
			// }
		}

		// passer au middleware suivant
		next();
	};
}

export default UserfileMiddleware;
