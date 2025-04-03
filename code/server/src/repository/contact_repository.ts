import MySQLService from "../service/mysql_service.js";
import type Contact from "../model/contact.js";
import MongoDBService from "../service/mongodb_service.js";
import { ObjectId } from "mongodb";

class ContactRepository {
	// nom de la collection
	private collection = "contact";

	// récupérer tous les documents
	public selectAll = () => {
		// connexion au serveur MongoDB
		const connection = new MongoDBService().connect();

		// sélectionner la collection
		const collection = connection.collection(this.collection);

		// récupérer les documents
		return collection.find().toArray();
	};

	public insert = async (
		data: Partial<Contact>,
	): Promise<Contact[] | unknown> => {
		const name = data.name?.trim();
		const email = data.email?.trim();
		const subject = data.subject?.trim();
		const message = data.message?.trim();

		if (!name || !email || !subject || !message) {
			return new Error("Champs requis.");
		}

		// connexion au serveur MongoDB
		const connection = new MongoDBService().connect();

		const mongoQuery = async () => {
			return await connection.collection(this.collection).insertOne({
				name: name,
				email: email,
				subject: subject,
				message: message,
			});
		};

		try {
			const result = await mongoQuery();

			return result;
		} catch (error) {
			return error instanceof Error
				? error
				: new Error("Erreur inconnue lors de l'insertion");
		}
	};

	public update = async (
		data: Partial<Contact>,
	): Promise<Contact[] | unknown> => {
		// connexion au serveur MongoDB
		const connection = await new MongoDBService().connect();

		const mongoQuery = async () => {
			if (!data._id) {
				throw new Error("A valid ID is required for update operation");
			}

			return await connection.collection(this.collection).updateOne(
				{ id: data._id },
				{
					$set: {
						name: data.name,
						email: data.email,
						subject: data.subject,
						message: data.message,
					},
				},
			);
		};

		try {
			const [results] = [await mongoQuery()];

			return results;
		} catch (error) {
			return error;
		}
	};

	public delete = async (
		data: Partial<Contact>,
	): Promise<Contact | unknown> => {
		if (!data._id) {
			return new Error(
				"Un _id valide est requis pour l'opération de suppression.",
			);
		}

		const connection = await new MongoDBService().connect();

		const mongoQuery = async () => {
			return await connection.collection(this.collection).deleteOne({
				_id: new ObjectId(data._id),
			});
		};

		try {
			const result = await mongoQuery();
			if (result.deletedCount > 0) {
				return {
					_id: data._id,
				} as Contact;
			}

			return new Error("Aucun contact trouvé avec cet _id pour suppression.");
		} catch (error) {
			return error instanceof Error
				? error
				: new Error("Aucun contact trouvé avec cet _id pour suppression.");
		}
	};
}

export default ContactRepository;
