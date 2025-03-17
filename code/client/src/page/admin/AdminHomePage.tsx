import styles from "../../assets/scss/admin/admin.module.scss";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
	return (
		<div className={styles.adminContainer}>
			<h1>Administration</h1>
			<Link to={"/admin/utilisateurs"}>Utilisateurs</Link>
		</div>
	);
};

export default AdminHomePage;
