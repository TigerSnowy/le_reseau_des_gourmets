import type { Request, Response } from "express";
import ContactRepository from "../repository/contact_repository.js";

class ContactController {
	// récupérer tous les documents
	public index = async (req: Request, res: Response) => {
		const results = await new ContactRepository().selectAll();

		// réponse HTTP
		res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	};
}

export default ContactController;
