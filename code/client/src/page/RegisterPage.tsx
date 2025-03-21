import { Link } from "react-router-dom";
import styles from "../assets/scss/auth/auth.module.scss";
import RegisterIllustration from "/img/cut.png";
import type User from "../model/user";
import { useForm } from "react-hook-form";
import SecurityAPI from "../service/security_api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<User>();

	const navigate = useNavigate();

	const [message, setMessage] = useState<string>();

	const onSubmit = async (values: User) => {
		console.log(values);

		// requête HTTP
		const request = await new SecurityAPI().register(values);

		console.log(request);

		// tester le code de statut HTTP
		if ([200, 201].includes(request.status)) {
			// s'il n'y a pas d'erreur => stocker un message en session
			window.sessionStorage.setItem("notice", "Compte créé");

			// redirection
			navigate("/connexion");
		} else {
			// s'il n'y a une erreur =>
			setMessage("Erreur - Email déjà enregistré");
		}
	};

	return (
		<div className={styles.authContainer}>
			<div className={styles.left}>
				<img src={RegisterIllustration} alt="Illustration inscription" />
			</div>
			<div className={styles.right}>
				<h1>INSCRIPTION</h1>

				{message ? <p>{message}</p> : null}

				<form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
					<label htmlFor="surname">Nom :</label>
					<input
						type="text"
						id="surname"
						placeholder="Nom"
						aria-required="true"
						{...register("surname", {
							required: "Ce champ est obligatoire.",
							minLength: {
								value: 2,
								message: "texte trop court.",
							},
						})}
					/>
					<small>{errors.surname?.message}</small>

					<label htmlFor="first_name">Prénom :</label>
					<input
						type="text"
						id="first_name"
						placeholder="Prénom"
						autoComplete="on"
						aria-required="true"
						{...register("first_name", {
							required: "Ce champ est obligatoire.",
							minLength: {
								value: 2,
								message: "Texte trop court.",
							},
						})}
					/>
					<small>{errors.first_name?.message}</small>

					<label htmlFor="pseudo">Pseudo :</label>
					<input
						type="text"
						id="pseudo"
						placeholder="Pseudo"
						aria-required="true"
						{...register("pseudo", {
							required: "Ce champ est obligatoire.",
						})}
					/>
					<small>{errors.pseudo?.message}</small>

					<label htmlFor="email">Email :</label>
					<input
						type="email"
						id="email"
						placeholder="Email"
						autoComplete="email"
						aria-required="true"
						{...register("email", {
							required: "Ce champ est obligatoire.",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Format d'email invalide.",
							},
						})}
					/>
					<small>{errors.email?.message}</small>

					<label htmlFor="password">Mot de passe :</label>
					<input
						type="password"
						id="password"
						placeholder="Mot de passe"
						aria-required="true"
						{...register("password", {
							required: "Ce champ est obligatoire.",
							minLength: {
								value: 6,
								message: "Le mot de passe doit contenir au moins 6 caractères.",
							},
						})}
					/>
					<small>{errors.password?.message}</small>

					<button type="submit">S'inscrire</button>
				</form>
				<p>
					Déjà un compte ? <Link to="/connexion">Se connecter</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
