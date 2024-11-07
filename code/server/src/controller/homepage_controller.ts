import type { Request, Response } from "express";

class HomepageController {
	public index = (req: Request, res: Response) => {

        // status : code de status HTTP
        // json : formater une réponse en JSON

        res.status(200).json({
            status: 200,
            message: 'Welcome to my API',
        });
    };
}

export default HomepageController;