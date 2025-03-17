import { useState } from "react";
import styles from "../../assets/scss/nav/nav.module.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const user = {
		username: "TigerSnowy",
		avatar: "/img/piti_piaf.jpg",
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const handleKeyDown = (event: { key: string }) => {
		if (event.key === "Enter" || event.key === " ") {
			toggleMenu();
		}
	};

	return (
		<nav className={styles.navbar}>
			<Link to="/accueil" className={styles.siteName}>
				Le Réseau <br />
				des Gourmets
			</Link>
			{/* bouton Mon Carnet */}
			{isLoggedIn && (
				<div className={styles.recipesMenu}>
					<Link to="/recettes" className={styles.myRecipesButton}>
						Mon Carnet
					</Link>
					<div className={styles.recipesDropdown}>
						<Link to="/recettes/creation">Créer une recette +</Link>
					</div>
				</div>
			)}

			{/* logo */}
			<Link to="/accueil" className={styles.logoContainer}>
				<img
					src="/img/logo_noir.svg"
					alt="Logo - Le Réseau des Gourmets"
					className={styles.logo}
				/>
			</Link>

			{/* bouton connecté */}
			<div className={styles.navLinks}>
				{isLoggedIn ? (
					<div className={styles.profileWrapper}>
						<button
							className={styles.loggedInButton}
							type="button"
							onClick={toggleMenu}
						>
							<span className={styles.username}>{user.username}</span>
							<img
								src={user.avatar}
								alt="Avatar utilisateur"
								className={styles.avatar}
							/>
						</button>

						{/* menu déroulant */}

						<div className={styles.dropdownMenu}>
							<button
								className={styles.logoutButton}
								onClick={() => setIsLoggedIn(false)}
								type="button"
							>
								Déconnexion
							</button>
						</div>
					</div>
				) : (
					<Link to="/connexion" className={styles.loginButton}>
						Connexion
					</Link>
				)}
			</div>
			<div
				className={`${styles.fullscreenMenu} ${isMenuOpen ? styles.open : ""}`}
			>
				<div className={styles.menuContent}>
					<Link to="/recettes">Mon Carnet</Link>
					<Link to="/recettes/creation">Créer une recette +</Link>
					<Link to="/profil/parametres">Paramètres</Link>
					<Link to="/profil/securite">Sécurité</Link>
					<Link to="/profil/themes">Thèmes</Link>
					<button
						type="button"
						className={styles.mobileLogoutButton}
						onClick={() => {
							setIsLoggedIn(false);
							closeMenu();
						}}
					>
						Déconnexion
					</button>
				</div>
			</div>
			{isMenuOpen && (
				<div
					className={styles.menuOverlay}
					onClick={closeMenu}
					onKeyDown={handleKeyDown}
					aria-label="Fermer le menu"
				/>
			)}
		</nav>
	);
};

export default NavBar;
