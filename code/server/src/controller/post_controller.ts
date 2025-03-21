// import type { Request, Response } from "express";
// import PostRepository from "../repository/post_repository.js";
// import Post from "../model/post.js";

// class PostController {
// 	public index = async (req: Request, res: Response) => {
// 		// récupérer tous les enregistrements
// 		const results = await new PostRepository().selectAll();

// 		// si la requête SQL renvoie une erreur
// 		if (results instanceof Error) {
// 			res.status(400).json({
// 				status: 400,
// 				// afficher un imple message pour l'introduction, sinon afficher l'erreur
// 				message: process.env.NODE_ENV === "prod" ? "Error" : results,
// 			});
// 			// pour bloquer la suite du script
// 			return;
// 		}

// 		// status : code de status HTTP
// 		// json : formater une réponse en JSON

// 		res.status(200).json({
// 			status: 200,
// 			message: "OK",
// 			data: results,
// 		});
// 	};

// 	public one = async (req: Request, res: Response) => {
// 		// récupérer un enregistrement
// 		// req.params permet de récupérer les variables de route
// 		const results = await new PostRepository().selectOne(req.params);

// 		// si la requête SQL renvoie une erreur
// 		if (results instanceof Error) {
// 			res.status(400).json({
// 				status: 400,
// 				// afficher un simple message pour la production, sinon afficher l'erreur
// 				message: process.env.NODE_ENV === "prod" ? "Error" : results,
// 			});
// 			// bloquer la suite du script
// 			return;
// 		}

// 		// status : code de status HTTP
// 		// json : formater une réponse en JSON

// 		res.status(200).json({
// 			status: 200,
// 			message: "OK",
// 			data: results,
// 		});
// 	};
// }

// export default PostController;
