import { Link } from "react-router-dom";
import styles from "../assets/scss/auth/auth.module.scss";
import LoginIllustration from "/img/pinch.png";

const LoginPage = () => {
	return (
		<div className={styles.authContainer}>
			{/* illustration */}
			<div className={styles.left}>
				<img src={LoginIllustration} alt="Illustration connexion" />
			</div>
			{/* formulaire */}
			<div className={styles.right}>
				<h1>CONNEXION</h1>
				<form>
					<label htmlFor="email">Email :</label>
					<input
						type="email"
						placeholder="Email"
						id="email"
						required
						aria-required
						autoComplete=""
					/>

					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						placeholder="Mot de passe"
						required
						aria-required
						autoComplete=""
					/>

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
