import { useContext, useEffect, useRef, useState } from "react";
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
	useEffect(() => {
		console.log("URL de l'API:", import.meta.env.VITE_API_URL);
	}, []);

	const location = useLocation();
	const { user, setUser, updateUserAvatar } = useContext(UserContext);

	// états pour l'édition du pseudo
	const [isEditingUsername, setIsEditingUsername] = useState(false);
	const [newPseudo, setNewPseudo] = useState(user?.pseudo || "");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const fileInputRef = useRef<HTMLInputElement>(null); // gestion du changement de photo de profil

	// récupérer l'avatar de l'user connecté ou utiliser une image par défaut
	const avatarSrc = user?.profile_picture
		? user.profile_picture.startsWith("/img/") ||
			user.profile_picture.startsWith("img/")
			? `${import.meta.env.VITE_API_URL}${user.profile_picture}`
			: `${import.meta.env.VITE_API_URL}/img/${user.profile_picture}`
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
				// Dans handleAvatarChange, avant d'appeler updateUserAvatar
				console.log("Réponse complète de l'API:", response);
				console.log(
					"Valeur exacte de profile_picture:",
					response.data.profile_picture,
				);
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
		setIsEditingUsername(true);
		setNewPseudo(user?.pseudo || "");
		setErrorMessage("");
		setSuccessMessage("");
	};

	const handleSaveUsername = async () => {
		if (!user || !user.user_id) return;

		// Validation basique
		if (!newPseudo.trim()) {
			setErrorMessage("Le pseudo ne peut pas être vide");
			return;
		}

		try {
			// Récupérer le token JWT depuis le localStorage
			const token = localStorage.getItem("token");

			if (!token) {
				setErrorMessage("Veuillez vous reconnecter");

				try {
					const authResponse = await new SecurityAPI().auth(user);
					if (authResponse.status === 200) {
						const newToken = authResponse.data.token;
						localStorage.setItem("token", newToken);
						console.log("Nouveau token obtenu:", newToken);

						// Utiliser le nouveau token pour mettre à jour le pseudo
						await updatePseudoWithToken(newToken);
					} else {
						console.error("Échec de la réauthentification");
						setErrorMessage("Échec de la réauthentification");
					}
				} catch (error) {
					console.error("Erreur lors de la réauthentification:", error);
					setErrorMessage("Erreur lors de la réauthentification");
				}
				return;
			}

			// Mettre à jour le pseudo avec le token existant
			await updatePseudoWithToken(token);
		} catch (error) {
			console.error("Error updating pseudo:", error);
			setErrorMessage("Une erreur est survenue lors de la mise à jour");
		}
	};

	const updatePseudoWithToken = async (token: string) => {
		if (!user) return;

		const response = await new UserAPI().updatePseudo(
			user.user_id,
			newPseudo,
			token,
		);

		if (response.status === 200) {
			// Mise à jour réussie
			setSuccessMessage("Pseudo mis à jour avec succès");
			setIsEditingUsername(false);

			// Mettre à jour l'utilisateur dans le contexte
			if (setUser && response.data) {
				setUser(response.data);

				// Mettre à jour l'utilisateur dans localStorage
				const updatedUser = {
					...user,
					pseudo: newPseudo,
				};
				localStorage.setItem("user", JSON.stringify(updatedUser));
			}
		} else if (response.status === 409) {
			// Pseudo déjà utilisé
			setErrorMessage("Ce pseudo est déjà utilisé");
		} else {
			setErrorMessage(response.message || "Une erreur est survenue");
		}
	};

	const handleCancelEdit = () => {
		setIsEditingUsername(false);
		setErrorMessage("");
		setSuccessMessage("");
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
							{isEditingUsername ? (
								<div className={styles.editUsernameForm}>
									<input
										type="text"
										value={newPseudo}
										onChange={(e) => setNewPseudo(e.target.value)}
										className={styles.usernameInput}
										maxLength={30}
									/>
									{errorMessage && (
										<p className={styles.errorMessage}>{errorMessage}</p>
									)}
									{successMessage && (
										<p className={styles.successMessage}>{successMessage}</p>
									)}
									<div className={styles.usernameButtons}>
										<button
											type="button"
											onClick={handleSaveUsername}
											className={styles.saveButton}
										>
											Enregistrer
										</button>
										<button
											type="button"
											onClick={handleCancelEdit}
											className={styles.cancelButton}
										>
											Annuler
										</button>
									</div>
								</div>
							) : (
								<>
									<h2 className={styles.username}>
										{user?.pseudo || "Gourmet"}
									</h2>
									<button
										className={styles.editButton}
										onClick={handleEditUsername}
										type="button"
									>
										<Pencil size={16} stroke="currentColor" />
									</button>
								</>
							)}
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
