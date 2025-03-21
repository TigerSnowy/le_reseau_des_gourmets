import { useContext, useEffect, useState } from "react";
import styles from "../../assets/scss/nav/nav.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/UserProvider";

const NavBar = () => {
	// const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	// const userTiggy = {
	// 	username: "TigerSnowy",
	// 	avatar: "/img/piti_piaf.jpg",
	// };

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const handleProfileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (isMobile) {
			toggleMenu();
		} else {
			navigate("/profil");
		}
	};

	const handleKeyDown = (event: { key: string }) => {
		if (event.key === "Enter" || event.key === " ") {
			toggleMenu();
		}
	};

	const navigate = useNavigate();

	// récupérer l'utilisateur
	const { user, setUser } = useContext(UserContext);

	return (
		<nav className={styles.navbar}>
			{/* {JSON.stringify(user)} */}
			{/* Débogage de l'avatar */}
			<div
				style={{
					position: "fixed",
					top: "5px",
					left: "5px",
					background: "white",
					padding: "5px",
					zIndex: 1000,
					fontSize: "12px",
				}}
			>
				Avatar path: {user?.profile_picture || "undefined"}
			</div>

			<Link to="/accueil" className={styles.siteName}>
				Le Réseau <br />
				des Gourmets
			</Link>
			{/* bouton Mon Carnet */}
			{!!user?.user_id && (
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
				{user ? (
					<div className={styles.profileWrapper}>
						<button
							className={styles.loggedInButton}
							type="button"
							onClick={handleProfileClick}
						>
							<span className={styles.username}>{user.pseudo}</span>
							<img
								src={user.profile_picture}
								alt="Avatar utilisateur"
								className={styles.avatar}
								// onError={(e) => {
								// 	console.error("Erreur de chargement d'image:", e);
								// 	e.currentTarget.src = "/img/default_avatars/chocolat.jpg"; // Image de secours
								// }}
							/>
						</button>

						{/* menu déroulant */}

						<div className={styles.dropdownMenu}>
							{user.role?.name === "admin" && (
								<button
									type="button"
									className={styles.qgButton}
									onClick={() => navigate("/admin")}
								>
									QG des Gourmets
								</button>
							)}
							<button
								className={styles.logoutButton}
								onClick={() => setUser(null)}
								type="button"
							>
								Déconnexion
							</button>
						</div>
					</div>
				) : (
					// non connecté
					<Link to="/connexion" className={styles.loginButton}>
						Connexion
					</Link>
				)}
			</div>

			{user && (
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
								setUser(null);
								closeMenu();
							}}
						>
							Déconnexion
						</button>
					</div>
				</div>
			)}
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
