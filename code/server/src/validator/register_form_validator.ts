import Joi from "joi";
import type User from "../model/user.js";

class RegisterFormValidator {
	// un validateur envoie la validation de votre saisie
	// values(peu import le nom) représente la saisie du formulaire
	public isValid = async (values: Partial<User>) => {
		// contraintes de validation
		const contraints = Joi.object({
			surname: Joi.string().required(),
			first_name: Joi.string().required(),
			pseudo: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			profile_picture: Joi.string().allow("").optional(),
		});

		try {
			// comparer la saisie avec les contraintes de validation
			return await contraints.validateAsync(values);
		} catch (error) {
			return error;
		}
	};
}

export default RegisterFormValidator;
