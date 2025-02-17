import { Link, Outlet, useLocation } from "react-router-dom";
import { Pencil } from "lucide-react";
import styles from "../assets/scss/profileLayout.module.scss";
import type React from "react";
import type { ReactNode } from "react";
import Footer from "../component/common/footer";
import NavBar from "../component/common/navbar";

type ProfileLayoutProps = {
	children?: ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
	const location = useLocation();

	const handleEditAvatar = () => {
		console.log("Modifier l'avatar");
	};

	const handleEditUsername = () => {
		console.log("Modifier le pseudo");
	};

	return (
		<div className={styles.profileLayout}>
			<NavBar />
			{/* sidebar*/}
			<aside className={styles.profileSidebar}>
				{/* photo de profil */}
				<div className={styles.profileInfo}>
					<div className={styles.avatarContainer}>
						<img
							src="/img/piti_piaf.jpg"
							alt="Avatar"
							className={styles.avatar}
						/>
						<button
							className={styles.editButton}
							onClick={handleEditAvatar}
							type="button"
						>
							<Pencil size={16} color="#FF715B" />
						</button>
					</div>
					{/* pseudo */}
					<div className={styles.usernameContainer}>
						<h2 className={styles.username}>TigerSnowy</h2>
						<button
							className={styles.editButton}
							onClick={handleEditUsername}
							type="button"
						>
							<Pencil size={16} stroke="currentColor" />
						</button>
					</div>
					{/* rôle */}
					<span className={styles.userRole}>Utilisateur</span>
				</div>

				{/* navigation */}
				<nav>
					<ul>
						<li
							className={
								location.pathname === "/profil/parametres" ? styles.active : ""
							}
						>
							<Link to="/profil/parametres">Paramètres</Link>
						</li>
						<li
							className={
								location.pathname === "/profil/securite" ? styles.active : ""
							}
						>
							<Link to="/profil/securite">Sécurité</Link>
						</li>
						<li
							className={
								location.pathname === "/profil/themes" ? styles.active : ""
							}
						>
							<Link to="/profil/themes">Thèmes</Link>
						</li>
					</ul>
				</nav>
			</aside>

			{/* contenu de sous-page */}

			<div className={styles.mainContent}>
				<Outlet />
				{children}
			</div>

			<Footer />
		</div>
	);
};

export default ProfileLayout;
