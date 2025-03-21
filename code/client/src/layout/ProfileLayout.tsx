import { useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Pencil } from "lucide-react";
import styles from "../assets/scss/profile/profileLayout.module.scss";
import type React from "react";
import type { ReactNode } from "react";
import Footer from "../component/common/footer";
import NavBar from "../component/common/navbar";
// import RoleList from "../component/home/RoleList";

type ProfileLayoutProps = {
	children?: ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
	const location = useLocation();
	// const [username, setUsername] = useState("TigerSnowy");
	const [avatar, setAvatar] = useState("/img/piti_piaf.jpg");

	// gestion du changement de photo de profil

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleEditAvatar = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setAvatar(imageUrl);
		}
	};

	// gestion du changement de photo de pseudo

	const handleEditUsername = () => {
		console.log("Modifier le pseudo");
	};

	return (
		<div className={styles.profileLayout}>
			<NavBar />
			<div className={styles.profileContainer}>
				{/* sidebar*/}
				<aside className={styles.profileSidebar}>
					{/* photo de profil */}
					<div className={styles.profileInfo}>
						<div className={styles.avatarContainer}>
							<img src={avatar} alt="Avatar" className={styles.avatar} />
							<button
								className={styles.editButton}
								onClick={handleEditAvatar}
								type="button"
							>
								<Pencil size={16} color="#FF715B" />
							</button>
							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								style={{ display: "none" }}
								onChange={handleAvatarChange}
							/>
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
									location.pathname === "/profil/parametres"
										? styles.active
										: ""
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
			</div>
			<Footer />
		</div>
	);
};

export default ProfileLayout;
