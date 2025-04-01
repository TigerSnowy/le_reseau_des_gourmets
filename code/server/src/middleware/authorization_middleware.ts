import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type User from "../model/user.js";

class AuthorizationMiddleware {
	// vérifier la validité du token et le rôle de l'utilisateur
	public check =
		(roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
			// récupérer le token contendu dans l'en-tête Authorization: Bearer <token>
			const token = req.headers.authorization?.split("Bearer ")[1];

			// console.log(token);

			// décoder le token
			let tokenDecoded: JwtPayload;

			try {
				tokenDecoded = jwt.verify(
					token as string,
					process.env.JWT_KEY as string,
				) as JwtPayload;
				console.log(tokenDecoded);
			} catch (error) {
				res.status(401).json({
					status: 401,
					// afficher un simple message pour la production, sinon afficher l'erreur
					message:
						process.env.NODE_ENV === "prod"
							? "Error"
							: "Unauthorized - Invalid token",
				});
				return;
			}
			if (roles.indexOf(tokenDecoded.user.role.name) === -1) {
				res.status(401).json({
					status: 401,
					// afficher un simple message pour la production, sinon afficher l'erreur
					message:
						process.env.NODE_ENV === "prod"
							? "Error"
							: "Unauthorized - Role not allowed",
				});
				return;
			}

			// injecter l'utilisateur dans req
			(req as Request & { user?: User }).user = tokenDecoded.user;

			// vérifier le rôle de l'utilisateur
			// passer au middleware suivant
			next();
		};
}

export default AuthorizationMiddleware;
