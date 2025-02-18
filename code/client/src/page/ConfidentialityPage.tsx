import styles from "../assets/scss/confidentiality.module.scss";

const ConfidentialityPage = () => {
	return (
		<div className={styles.confidentialityPage}>
			<div className={styles.passwordChange}>
				<h2>CHANGER DE MOT DE PASSE</h2>
				<input type="password" placeholder="Mot de passe actuel" />
				<input type="password" placeholder="Nouveau mot de passe" />
				<input
					type="password"
					placeholder="Confirmez le nouveau mot de passe"
				/>
				<button type="button">Enregistrer</button>
			</div>
			<div className={styles.accountActions}>
				<button type="button">Se déconnecter de tous les appareils</button>
				<button className={styles.deleteAccount} type="button">
					Supprimer mon compte
				</button>
			</div>
		</div>
	);
};

export default ConfidentialityPage;
