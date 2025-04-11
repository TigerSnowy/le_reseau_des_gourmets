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
				<div>
					<h3 className={styles.featureTitle}>{title}</h3>
				</div>
				<div>
					<p className={styles.featureDescription}>{description}</p>
				</div>
			</div>
		</div>
	);
};

export default FeatureCard;
