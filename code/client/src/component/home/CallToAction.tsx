import styles from "../../assets/scss/home/callToAction.module.scss";

const CallToAction: React.FC = () => {
	return (
		<section className={styles.ctaSection}>
			<div className={styles.ctaContainer}>
				<h2 className={styles.ctaTitle}>
					Rejoignez notre communauté de gourmets
				</h2>
				<p className={styles.ctaDescription}>
					Créez un compte gratuit et commencez à organiser vos recettes
					préférées dès aujourd'hui.
				</p>
				<div className={styles.ctaButtons}>
					<button
						onClick={() => {
							window.location.href = "/inscription";
						}}
						type="button"
						className={styles.ctaPrimaryButton}
					>
						Créer un compte
					</button>
					{/* <Link to="/recettes" className={styles.ctaSecondaryButton}>
						Découvrir les recettes
					</Link> */}
				</div>
			</div>
		</section>
	);
};

export default CallToAction;
