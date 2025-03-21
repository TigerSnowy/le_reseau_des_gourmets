import { Link } from "react-router-dom";
import styles from "../assets/scss/auth/auth.module.scss";
import LoginIllustration from "/img/pinch.png";
import type User from "../model/user";
import { useForm } from "react-hook-form";
// import Notice from "../component/common/notice";
import { useNavigate } from "react-router-dom";
import SecurityAPI from "../service/security_api";
import { useContext, useState } from "react";
import { UserContext } from "../provider/UserProvider";

const LoginPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<User>();

	const navigate = useNavigate();

	const [message, setMessage] = useState<string>();

	const { setUser } = useContext(UserContext);

	const onSubmit = async (values: User) => {
		// console.log(values);

		const request = await new SecurityAPI().login(values);

		console.log(request);

		if ([200, 201].includes(request.status)) {
			// stocker l'utilisateur dans le contexte
			setUser(request.data);

			// redirection
			if (request.data.role.name === "admin") {
				navigate("/admin");
			} else {
				navigate("/");
			}
		} else {
			// s'il n'y a une erreur =>
			setMessage("Erreur - Email ou mot de passe erroné");
		}
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

				{/* <Notice /> */}

				{message ? <p>{message}</p> : null}

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
