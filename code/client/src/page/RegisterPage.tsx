import { Link } from "react-router-dom";
import styles from "../assets/scss/auth/auth.module.scss";
import RegisterIllustration from "/img/cut.png";

const RegisterPage = () => {
	return (
		<div className={styles.authContainer}>
			<div className={styles.left}>
				<img src={RegisterIllustration} alt="Illustration inscription" />
			</div>
			<div className={styles.right}>
				<h1>INSCRIPTION</h1>
				<form>
					<input type="text" placeholder="Nom" required />
					<input type="text" placeholder="Prénom" required />
					<input type="text" placeholder="Pseudo" required />
					<input type="email" placeholder="Email" required />
					<input type="password" placeholder="Mot de passe" required />
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
