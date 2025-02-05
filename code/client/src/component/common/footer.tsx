import { Link } from "react-router-dom";
import styles from "../../assets/scss/footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.copyright}>© 2024 Le Réseau des Gourmets</div>
			<Link to={"/"} className={styles.contactLink}>
				À votre écoute
			</Link>
			<Link to={"/"} className={styles.blogLink}>
				Les Saveurs du Réseau
			</Link>
			<Link to={"/"} className={styles.legalNoticesLink}>
				Mentions légales
			</Link>
			<Link to={"/"} className={styles.privacyPolicyLink}>
				Politique de confidentialité
			</Link>
		</footer>
	);
};

export default Footer;
