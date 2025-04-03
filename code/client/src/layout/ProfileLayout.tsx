import { useContext, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Pencil } from "lucide-react";
import styles from "../assets/scss/profile/profileLayout.module.scss";
import type React from "react";
import type { ReactNode } from "react";
import Footer from "../component/common/footer";
import NavBar from "../component/common/navbar";
import { UserContext } from "../provider/UserProvider";
import UserAPI from "../service/user_api";
import SecurityAPI from "../service/security_api";

type ProfileLayoutProps = {
	children?: ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
	const location = useLocation();

	// const [avatar, setAvatar] = useState("/img/piti_piaf.jpg");
	const { user, updateUserAvatar } = useContext(UserContext);

	// gestion du changement de photo de profil

	const fileInputRef = useRef<HTMLInputElement>(null);

	// récupérer l'avatar de l'user connecté ou utiliser une image par défaut
	const avatarSrc = user?.profile_picture
		? `${import.meta.env.VITE_API_URL}/img/${user.profile_picture}`
		: "/img/default_avatars/cookies.jpg";

	const handleEditAvatar = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleAvatarChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (file && user) {
			// FormData pour envoyer le fichier
			const formData = new FormData();

			formData.append("profile_picture", file);
			formData.append("user_id", user.user_id.toString());

			try {
				// récupérer le token depuis le localStorage
				const token = localStorage.getItem("token");
				console.log("Token récupéré", token);

				if (!token) {
					console.error("Token not found");

					try {
						const authResponse = await new SecurityAPI().auth(user);
						if (authResponse.status === 200) {
							const newToken = authResponse.data.token;
							localStorage.setItem("token", newToken);
							console.log("Nouveau token obtenu:", newToken);

							// Utiliser le nouveau token
							const response = await new UserAPI().updateAvatar(
								formData,
								newToken,
							);
							if (response.status === 200) {
								updateUserAvatar(response.data.profile_picture);
								console.log("Avatar mis à jour avec succès");
							} else {
								console.error(
									"Erreur lors de la mise à jour:",
									response.message,
								);
							}
						} else {
							console.error("Échec de la réauthentification");
						}
					} catch (error) {
						console.error("Erreur lors de la réauthentification:", error);
					}
					return;
				}

				// appeler l'API pour mettre l'avatar à jour
				const response = await new UserAPI().updateAvatar(formData, token);

				if (response.status === 200) {
					// mets à jour l'état local avec le nouveau nom de fichier
					updateUserAvatar(response.data.profile_picture);
					console.log("Avatar mis à jour avec succès");

					// mets à jour l'utilisateur dans localStorage
					const updateUser = {
						...user,
						profile_picture: response.data.profile_picture,
					};
					localStorage.setItem("user", JSON.stringify(updateUser));
				} else {
					console.error("Erreur lors de la mise à jour:", response.message);
				}
			} catch (error) {
				console.error("Erreur lors de la mise à jour de l'avatar:", error);
			}
		}
	};

	// gestion du changement de pseudo

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
							<img src={avatarSrc} alt="Avatar" className={styles.avatar} />
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
							<h2 className={styles.username}>{user?.pseudo || "Gourmet"}</h2>
							<button
								className={styles.editButton}
								onClick={handleEditUsername}
								type="button"
							>
								<Pencil size={16} stroke="currentColor" />
							</button>
						</div>
						{/* rôle */}
						<span className={styles.userRole}>
							{user?.role?.name || "User"}
						</span>
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
