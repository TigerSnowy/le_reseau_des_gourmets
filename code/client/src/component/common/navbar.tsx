import { useState } from "react";
import styles from "../../assets/scss/nav.module.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const user = {
		username: "TigerSnowy",
		avatar: "/img/piti_piaf.jpg",
	};

	return (
		<nav className={styles.navbar}>
			{/* bouton blog */}
			<Link to="/" className={styles.blogButton}>
				Les Saveurs du Réseau
			</Link>

			{/* logo */}
			<div className={styles.logoContainer}>
				<img
					src="/img/logo_noir.svg"
					alt="Logo - Le Réseau des Gourmets"
					className={styles.logo}
				/>
			</div>

			{/* bouton connexion/connecté */}
			<div className={styles.navLinks}>
				{isLoggedIn ? (
					<Link to="/profil/parametres" className={styles.loggedInButton}>
						<span className={styles.username}>{user.username}</span>
						<img
							src={user.avatar}
							alt="Avatar utilisateur"
							className={styles.avatar}
						/>
					</Link>
				) : (
					<Link to="/connexion" className={styles.loginButton}>
						Connexion
					</Link>
				)}

				{/* menu déroulant */}
				{isLoggedIn && (
					<div className={styles.dropdownMenu}>
						<Link to="/">Mon Carnet</Link>
						<Link to="/">Créer une recette +</Link>
						<button
							className={styles.logoutButton}
							onClick={() => setIsLoggedIn(false)}
							type="button"
						>
							Déconnexion
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;

// const Nav = () => {
// 	// créer une référence : permet de cibler un élément HTML
// 	// remplace l'utilisation de querySelector / querySelectorAll
// 	// const référence = useRef<type de l'élément ciblé>(valeur initiale de la référence)

// 	const siteNav = useRef<HTMLDivElement>(null);

// 	// créer un état : useState
// 	// const [état, setter de l'état] = useState<typer l'état>(valeur initiale de l'état)

// 	const [navMobileIsVisible, setnavMobileIsVisible] = useState<boolean>(false);

// 	// clic sur le bouton de navigatoon mobile
// 	const click = () => {
// 		// modifier l'état à l'aide du sette
// 		setnavMobileIsVisible(!navMobileIsVisible);
// 		console.log(navMobileIsVisible);
// 	};

// 	return (
// 		<>
// 			{/* la seule condition disponible dans le HTML de react : condition ternaire
//                     condition ? vraie : faux
//                 si une autre condition est à utiliser il est nécessaire de créer une fonction externe */}
// 			<nav
// 				className={`${styles["site-nav"]} ${navMobileIsVisible ? styles["site-nav-visible"] : ""}`}
// 				ref={siteNav}
// 			>
// 				{/* attribut ref permet de relier une référence à une balise HTML */}
// 				{/* les balises a sont remplacées par le composant Link et les attributs href sont remplacés par to */}

// 				<Link to={"/"}>Home</Link>
// 				<Link to={"/contact"}>Contact</Link>
// 			</nav>
// 			{/* ajouter des événements :
//                     - utiliser l'événement directement dans la balise
//                     - dans le composant, créer une fonction liée à l'événement */}

// 			<button
// 				className={styles["btn-nav-mobile"]}
// 				type="button"
// 				onClick={click}
// 			>
// 				Click me
// 			</button>
// 		</>
// 	);
// };
