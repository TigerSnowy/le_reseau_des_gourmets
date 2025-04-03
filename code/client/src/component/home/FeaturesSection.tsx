import styles from "../../assets/scss/home/sectionFeatures.module.scss";

type FeaturesSectionProps = {
	children: React.ReactNode;
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ children }) => {
	return (
		<section className={styles.featuresSection}>
			<div className={styles.featuresContainer}>{children}</div>
		</section>
	);
};

export default FeaturesSection;
