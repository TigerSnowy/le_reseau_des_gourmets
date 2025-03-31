import type { NextFunction, Request, Response } from "express";

class AuthorizationMiddleware {
	// vérifier la validité du token et le rôle de l'utilisateur
	public check =
		(roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
			// récupérer le token contendu dans l'en-tête Authorization: Bearer <token>
			const token = req.headers.authorization?.split("Bearer ")[1];

			console.log(token);

			// passer au middleware suivant
			next();
		};
}

export default AuthorizationMiddleware;
