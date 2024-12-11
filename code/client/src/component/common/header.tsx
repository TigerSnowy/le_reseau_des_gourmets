import Nav from "./nav";

// import d'un CSS d'un composant
import styles from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		// en React, l'attribut class ne peut pas être utilisé, il est remplacé par className
		// la classe est placé entre crochet et guillemets lorsqu'un tiret est présent dans son nom, car js prend le tiret comme un {moins -} et s'attends à un nombre

		<header className={styles["site-header"]}>
			<div className={styles["site-logo"]}>
				{/* utiliser / pour cibler le dossier public */}
				<Link to={"/"}>
					<img src="/img/logo.png" alt="" />
				</Link>
			</div>
			<Nav />
		</header>
	);
};

export default Header;
