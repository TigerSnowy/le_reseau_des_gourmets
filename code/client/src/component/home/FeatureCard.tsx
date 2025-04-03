import styles from "../../assets/scss/home/featureCard.module.scss";

type FeatureCardProps = {
	title: string;
	description: string;
	imageUrl: string;
	altText: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
	title,
	description,
	imageUrl,
	altText,
}) => {
	return (
		<div className={styles.featureCard}>
			<div className={styles.featureImageContainer}>
				<img src={imageUrl} alt={altText} className={styles.featureImage} />
			</div>

			<div className={styles.featureContent}>
				<h2 className={styles.featureTitle}>{title}</h2>
				<p className={styles.featureDescription}>{description}</p>
			</div>
		</div>
	);
};

export default FeatureCard;
