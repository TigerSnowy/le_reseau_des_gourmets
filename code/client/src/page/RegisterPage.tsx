import { Link } from "react-router-dom";
import styles from "../assets/scss/auth/auth.module.scss";
import RegisterIllustration from "/img/cut.png";
import type User from "../model/user";
import { useForm } from "react-hook-form";
import SecurityAPI from "../service/security_api";
// import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<User>();

	// const navigate = useNavigate();

	const onSubmit = async (values: User) => {
		console.log(values);

		// requête HTTP
		const request = await new SecurityAPI().register(values);

		console.log(request);

		// tester le code de statut HTTP
		// if ([200, 201].indexOf(request.status) > -1) {
		// 	// redirection
		// 	navigate("/profil");
		// }
	};

	return (
		<div className={styles.authContainer}>
			<div className={styles.left}>
				<img src={RegisterIllustration} alt="Illustration inscription" />
			</div>
			<div className={styles.right}>
				<h1>INSCRIPTION</h1>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
					<label htmlFor="surname">Nom :</label>
					<input
						type="text"
						id="surname"
						placeholder="Nom"
						aria-required
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
						aria-required
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
						aria-required
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
						aria-required
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
						aria-required
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
