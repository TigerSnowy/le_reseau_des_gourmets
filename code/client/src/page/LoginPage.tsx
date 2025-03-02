import { Link } from "react-router-dom";
import styles from "../assets/scss/auth.module.scss";
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
					<input type="email" placeholder="Email" required />
					<input type="password" placeholder="Mot de passe" required />
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
