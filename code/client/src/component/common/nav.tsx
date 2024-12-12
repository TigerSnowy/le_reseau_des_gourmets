import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import { useRef, useState } from "react";

const Nav = () => {
	// créer une référence : permet de cibler un élément HTML
	// remplace l'utilisation de querySelector / querySelectorAll
	// const référence = useRef<type de l'élément ciblé>(valeur initiale de la référence)

	const siteNav = useRef<HTMLDivElement>(null);

	// créer un état : useState
	// const [état, setter de l'état] = useState<typer l'état>(valeur initiale de l'état)

	const [navMobileIsVisible, setnavMobileIsVisible] = useState<boolean>(false);

	// clic sur le bouton de navigatoon mobile
	const click = () => {
		// modifier l'état à l'aide du sette
		setnavMobileIsVisible(!navMobileIsVisible);
		console.log(navMobileIsVisible);
	};

	return (
		<>
			{/* la seule condition disponible dans le HTML de react : condition ternaire
                    condition ? vraie : faux
                si une autre condition est à utilisern il est nécessaire de créer une fonction externe */}
			<nav
				className={`${styles["site-nav"]} ${navMobileIsVisible ? styles["site-nav-visible"] : ""}`}
				ref={siteNav}
			>
				{/* attribut ref permet de relier une référence à une balise HTML */}
				{/* les balises a sont remplacées par le composant Link et les attributs href sont remplacés par to */}
				<Link to={"/"}>Home</Link>
				<Link to={"/contact"}>Contact</Link>
			</nav>
			{/* ajouter des événements :
                    - utiliser l'événement directement dans la balise
                    - dans le composant, créer une fonction liée à l'événement */}

			<button
				className={styles["btn-nav-mobile"]}
				type="button"
				onClick={click}
			>
				Click me
			</button>
		</>
	);
};

export default Nav;
