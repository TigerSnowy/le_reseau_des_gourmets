import { Link } from "react-router-dom";
import styles from "../../assets/scss/nav/footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.copyright}>© 2024 Le Réseau des Gourmets</div>
			<Link
				to={"/contact"}
				className={styles.contactLink}
				aria-label="À votre écoute - Contactez-nous"
			>
				À votre écoute
			</Link>
			<Link
				to={"/mentions-legales"}
				className={styles.legalNoticesLink}
				aria-label="Mentions légales"
			>
				Mentions légales
			</Link>
			<Link
				to={"/politique-de-confidentialite"}
				className={styles.privacyPolicyLink}
				aria-label="Politique de confidentialité"
			>
				Politique de confidentialité
			</Link>
		</footer>
	);
};

export default Footer;
