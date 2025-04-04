import type { Request, Response } from "express";
import ContactRepository from "../repository/contact_repository.js";
import {
	sendMailConfirmation,
	sendMailToAdmin,
} from "../service/email_service.js";

class ContactController {
	// récupérer tous les documents
	public index = async (req: Request, res: Response) => {
		try {
			const results = await new ContactRepository().selectAll();

			// réponse HTTP
			res.status(200).json({
				status: 200,
				message: "OK",
				data: results,
			});
		} catch (error) {
			console.error("Erreur lors de la récupération des messages:", error);
			res.status(500).json({
				status: 500,
				message: "Erreur lors de la récupération des messages",
				error: process.env.NODE_ENV === "prod" ? undefined : error,
			});
		}
	};

	// insérer un nouveau message
	public insert = async (req: Request, res: Response): Promise<void> => {
		try {
			console.log("Réception d'un nouveau message:", req.body);

			if (!req.body.name || !req.body.email || !req.body.message) {
				res.status(400).json({
					status: 400,
					message: "Les champs nom, email et message sont obligatoires",
				});
				return;
			}

			// enregistrer le message dans MongoDB
			const result = await new ContactRepository().insert(req.body);

			console.log("Message enregistré dans MongoDB:", result);

			// envoyer un email de confirmation à l'utilisateur
			try {
				await sendMailConfirmation(req.body.email);
				console.log("Email de confirmation envoyé à", req.body.email);
			} catch (emailError) {
				console.error(
					"Erreur lors de l'envoi du mail de confirmation:",
					emailError,
				);
				// On continue même si l'email de confirmation échoue
			}

			// envoyer un email à l'administrateur avec le contenu du message
			try {
				await sendMailToAdmin(req.body);
				console.log("Email envoyé à l'administrateur");
			} catch (emailError) {
				console.error(
					"Erreur lors de l'envoi du mail à l'administrateur:",
					emailError,
				);
				// on continue même si l'email à l'admin échoue
			}

			res.status(201).json({
				status: 201,
				message: "Message envoyé avec succès",
				data: result,
			});
		} catch (error) {
			console.error("Erreur lors de l'envoi du message:", error);
			res.status(500).json({
				status: 500,
				message: "Erreur serveur lors de l'envoi du message",
				error: process.env.NODE_ENV === "prod" ? undefined : error,
			});
		}
	};
}

export default ContactController;
