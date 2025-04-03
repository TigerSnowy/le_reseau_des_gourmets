import type {
	NextFunction,
	Request,
	Response,
} from "express-serve-static-core";
import RegisterFormValidator from "../validator/register_form_validator.js";

class RegisterFormValidatorMiddlware {
	// validation de la saisie
	public validate = async (req: Request, res: Response, next: NextFunction) => {
		// envoyer la saisie au validateur
		const isValid = await new RegisterFormValidator().isValid(req.body);

		console.log(isValid);

		// si une erreur de validation est renvoyée
		if (isValid instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : isValid,
			});
			return;
		}

		next();
	};
}

export default RegisterFormValidatorMiddlware;
