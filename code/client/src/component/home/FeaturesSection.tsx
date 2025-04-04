import styles from "../../assets/scss/home/sectionFeatures.module.scss";

type FeaturesSectionProps = {
	children: React.ReactNode;
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ children }) => {
	return (
		<section
			className={styles.featuresSection}
			aria-labelledby="titre-fonctionnalites"
		>
			<h2 id="titre-fonctionnalites" className={styles.visuallyHidden}>
				Nos fonctionnalités
			</h2>
			<div className={styles.featuresContainer}>{children}</div>
		</section>
	);
};

export default FeaturesSection;
