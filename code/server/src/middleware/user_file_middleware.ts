import type { NextFunction, Request, Response } from "express";

class UserfileMiddleware {
	public process = (req: Request, res: Response, next: NextFunction) => {
		console.log("user file middleware");

		console.log(req.body);
		console.log(req.files);

		// passer au middleware suivant
		next();
	};
}

export default UserfileMiddleware;
