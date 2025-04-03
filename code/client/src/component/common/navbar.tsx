import { useContext, useEffect, useState } from "react";
import styles from "../../assets/scss/nav/nav.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/UserProvider";

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 950);
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

	// deconnexion et redirection

	const navigate = useNavigate();

	const handleLogout = () => {
		closeMenu();

		navigate("/deconnexion");
	};

	// récupérer l'utilisateur
	const { user } = useContext(UserContext);

	return (
		<nav className={styles.navbar}>
			{/* Nous retirons le débuggage d'avatar pour la production */}

			<Link to="/accueil" className={styles.siteName}>
				Le Réseau <br />
				des Gourmets
			</Link>

			{/* {JSON.stringify(user)} */}

			{/* bouton Mon Carnet - visible uniquement en desktop */}
			{!!user?.user_id && (
				<div className={styles.recipesMenu}>
					<Link to="/recettes" className={styles.myRecipesButton}>
						Mon Carnet
					</Link>
					{/* bouton Créer une recette */}
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
							aria-label={isMobile ? "Ouvrir le menu" : "Voir le profil"}
						>
							<span className={styles.username}>{user.pseudo}</span>
							<img
								src={
									user.profile_picture
										? `${import.meta.env.VITE_API_URL}/img/${user.profile_picture}`
										: "/img/default_avatars/chocolat.jpg"
								}
								alt="Avatar utilisateur"
								className={styles.avatar}
								onError={(e) => {
									console.error("Erreur de chargement d'image:", e);
									e.currentTarget.src = "/img/default_avatars/chocolat.jpg"; // Image de secours
								}}
							/>
						</button>

						{/* menu déroulant - visible uniquement en desktop */}
						<div className={styles.dropdownMenu}>
							{user.role?.name === "admin" && (
								<button
									type="button"
									className={styles.qgButton}
									onClick={() => navigate("/admin")}
								>
									QG
								</button>
							)}
							<button
								className={styles.logoutButton}
								onClick={handleLogout}
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

			{/* Menu plein écran pour mobile */}
			{user && (
				<div
					className={`${styles.fullscreenMenu} ${isMenuOpen ? styles.open : ""}`}
					aria-hidden={!isMenuOpen}
				>
					<div className={styles.menuContent}>
						<Link to="/recettes" onClick={closeMenu}>
							Mon Carnet
						</Link>
						<Link to="/recettes/creation" onClick={closeMenu}>
							Créer une recette +
						</Link>
						<Link to="/profil" onClick={closeMenu}>
							Mon Profil
						</Link>
						<Link to="/profil/parametres" onClick={closeMenu}>
							Paramètres
						</Link>
						<Link to="/profil/securite" onClick={closeMenu}>
							Sécurité
						</Link>
						<Link to="/profil/themes" onClick={closeMenu}>
							Thèmes
						</Link>
						{user.role?.name === "admin" && (
							<Link to="/admin" onClick={closeMenu}>
								QG
							</Link>
						)}
						<button
							type="button"
							className={styles.mobileLogoutButton}
							onClick={handleLogout}
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
					tabIndex={0}
					role="button"
					aria-label="Fermer le menu"
				/>
			)}
		</nav>
	);
};

export default NavBar;
