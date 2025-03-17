import { useState, useEffect } from "react";
import type User from "../../../model/user";
import UserAPI from "../../../service/user_api";
import { Link } from "react-router-dom";
import styles from "../../../assets/scss/admin/adminUserList.module.scss";

const AdminUserList = () => {
	// état pour stocker les données
	const [users, setUsers] = useState<User[]>([]);

	// récupérer les données à l'affichage du composant
	useEffect(() => {
		new UserAPI().selectAll().then((response) => setUsers(response.data));
	}, []);

	return (
		<div className={styles.userListContainer}>
			<h2>Liste d'utilisateurs</h2>

			<p>
				<Link to={"/admin/utilisateurs/formulaire"}>Nouveau +</Link>
			</p>

			<table>
				<tr className={styles.listTitles}>
					<th>Rôle</th>
					<th>Nom</th>
					<th>Pseudo</th>
					<th>Email</th>
					<th />
				</tr>
			</table>

			{users.map((user) => {
				return (
					<tr key={Math.random()} className={styles.userList}>
						<td>{user.role_id}</td>
						<td>
							{user.surname} {user.first_name}
						</td>
						<td>{user.pseudo}</td>
						<td>{user.email}</td>
						<td>
							<Link to={""}>Modifier</Link>
							<Link to={""}>Supprimer</Link>
						</td>
					</tr>
				);
			})}
		</div>
	);
};

export default AdminUserList;

/* {
	
    
pour accéder à une FK array : 

<td>
    <ul>
        recipe.ingredient.map(ingredient => {
            return <li key={Math.random()}>{ingredient.name}</li>;
        })}
    </ul>
</td> 

pour date et heure : 

<td>
    {
        new Date(booking.date_time).toLocaleDateString()
    }

</td> 


}*/
