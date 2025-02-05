import { Link, Outlet, useLocation } from "react-router-dom";
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

	return (
		<div className={styles.profil}>
			<NavBar />
			{/* sidebar*/}
			<aside className={styles.profileSidebar}>
				{/* photo de profil + pseudo */}
				<div className={styles.profilInfo}>
					<img
						src="/public/img/piti_piaf.jpg"
						alt="Avatar"
						className={styles.avatar}
					/>
					<h2 className={styles.username}>TigerSnow</h2>
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

			{/* contenu */}

			<div className={styles.main}>
				<Outlet />
				{children}
			</div>

			<Footer />
		</div>
	);
};

export default ProfileLayout;
