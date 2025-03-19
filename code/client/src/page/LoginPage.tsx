import { Link } from "react-router-dom";
import styles from "../assets/scss/auth/auth.module.scss";
import LoginIllustration from "/img/pinch.png";
import type User from "../model/user";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<User>();

	// const navigate = useNavigate();

	const onSubmit = async (values: User) => {
		console.log(values);

		// const formData = new FormData();
		// formData.append("user_id", values.user_id.toString());
		// formData.append("surname", values.surname);
		// formData.append("first_name", values.first_name);
		// formData.append("pseudo", values.pseudo);
		// formData.append("email", values.email);
		// formData.append("password", values.password);
		// formData.append("role_id", "2");
		// if (values.profile_picture?.length) {
		// 	formData.append("profile_picture", values.profile_picture[0]);
		// }
		// si un champ renvoie un chiffre, ajouter "as unknown as string" ou .toString() après values.qdhddab
		// un champ file renvoie une liste de fichiers (FileList) ; s'il ne faut envoyer qu'un seul fichier, ajouter [0] après le values.qdhddab
		// console.log(values);
		// console.log(formData);
		// requête HTTP
		// const request = id
		// 	? await new UserAPI().update(formData)
		// 	: await new UserAPI().insert(formData);
		// tester le code de statut HTTP
		// if ([200, 201].indexOf(request.status) > -1) {
		// 	// redirection
		// 	navigate("/admin/utilisateurs");
		// }
	};

	return (
		<div className={styles.authContainer}>
			{/* illustration */}
			<div className={styles.left}>
				<img src={LoginIllustration} alt="Illustration connexion" />
			</div>
			{/* formulaire */}
			<div className={styles.right}>
				<h1>CONNEXION</h1>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
					<label htmlFor="email">Email :</label>
					<input
						type="email"
						placeholder="Email"
						id="email"
						aria-required
						autoComplete="on"
						{...register("email", {
							required: "Ce champ est obligatoire.",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Format d'email invalide.",
							},
						})}
					/>
					<small>{errors.email?.message}</small>

					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						id="password"
						placeholder="Mot de passe"
						aria-required
						autoComplete="on"
						{...register("password", {
							required: "Ce champ est obligatoire.",
						})}
					/>
					<small>{errors.password?.message}</small>

					<button type="submit">Se connecter</button>
				</form>
				<p>
					Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
				</p>
				<Link to="/mot-de-passe-oublie">Mot de passe oublié</Link>
			</div>
		</div>
	);
};

export default LoginPage;
