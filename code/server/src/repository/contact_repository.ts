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

	public insert = async (data: Contact) => {
		// connexion au serveur MongoDB
		const connection = new MongoDBService().connect();

		// sélectionner la collection
		const collection = connection.collection(this.collection);

		// ajouter la date de création, sans inclure l'id
		// MongoDB va générer un id automatiquement
		const { _id, ...dataWithoutId } = data;
		const contactData = {
			...dataWithoutId,
			createdAt: new Date(),
		};

		// insérer le document
		return collection.insertOne(contactData);
	};
}

export default ContactRepository;
