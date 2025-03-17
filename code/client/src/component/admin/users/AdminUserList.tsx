import { useState, useEffect } from "react";
import type User from "../../../model/user";
import UserAPI from "../../../service/user_api";
import { Link } from "react-router-dom";
import styles from "../../../assets/scss/admin/adminUserList.module.scss";
import { useForm } from "react-hook-form";
import type Role from "../../../model/role";
import RoleAPI from "../../../service/role_api";

const AdminUserList = () => {
	// état pour stocker les données
	const [users, setUsers] = useState<User[]>([]);

	const [roles, setRoles] = useState<Role[]>();

	// état pour gérer quel utilisateur est en mode édition
	const [editingUserId, setEditingUserId] = useState<number | null>(null);

	// état pour stocket la sélection des rôles
	const [selectedRoles, setSelectedRoles] = useState<{ [key: number]: number }>(
		{},
	);

	const { register } = useForm<Role>();

	// récupére la liste des rôles
	useEffect(() => {
		new RoleAPI().selectAll().then((response) => setRoles(response.data));
	}, []);

	// récupérer la liste des utilisateurs
	useEffect(() => {
		new UserAPI().selectAll().then((response) => {
			setUsers(response.data);

			// initialiser l'état avce les rôles actuels des utilisateurs
			const initialRoles: { [key: number]: number } = {};
			for (const user of response.data) {
				initialRoles[user.user_id] = user.role_id;
			}
			setSelectedRoles(initialRoles);
		});
	}, []);

	// active/désactive l'édition pour un utilisateur spécifique
	const toggleEdit = (userId: number) => {
		setEditingUserId(editingUserId === userId ? null : userId);
	};

	const handleRoleChange = (userId: number, newRoleId: number) => {
		setSelectedRoles((prev) => ({
			...prev,
			[userId]: newRoleId,
		}));
	};

	// useEffect(() => {
	// 	// exécuter en chaine des promesses
	// 	Promise.allSettled([new RoleAPI().selectAll()]).then((responses) => {
	// 		// si la première promesse est tenue
	// 		if (responses[0].status === "fulfilled") {
	// 			setRoles(responses[0].value.data);
	// 		}
	// 		console.log(responses);
	// 	});
	// }, []);

	return (
		<div className={styles.userListContainer}>
			<h2>Liste d'utilisateurs</h2>

			<p>
				<Link to={"/admin/utilisateurs/formulaire"}>Nouveau +</Link>
			</p>
			<div className={styles.tableContainer}>
				<table className={styles.userTable}>
					<thead>
						<tr>
							<th>Photo de profil</th>
							<th>Rôle</th>
							<th>Nom</th>
							<th>Pseudo</th>
							<th>Email</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr key={user.user_id}>
									<td>
										<img
											src={`${import.meta.env.VITE_API_URL}/img/${user.profile_picture}`}
											alt=""
										/>
									</td>
									<td>
										{editingUserId === user.user_id ? (
											<select
												id="role_id"
												{...register("role_id")}
												value={selectedRoles[user.user_id]} // valeur actuelle
												onChange={(e) =>
													handleRoleChange(user.user_id, Number(e.target.value))
												}
											>
												<option value="">Rôle</option>
												{roles?.map((role) => (
													<option key={role.role_id} value={role.role_id}>
														{role.name}
													</option>
												))}
											</select>
										) : (
											// afficher le rôle actuel quand l’édition est désactivée
											roles?.find((role) => role.role_id === user.role_id)
												?.name || "Non défini"
										)}
									</td>
									<td>
										{user.surname} {user.first_name}
									</td>
									<td>{user.pseudo}</td>
									<td>{user.email}</td>
									<td>
										{/* Toggle entre modifier et sauvegarder */}
										<button
											type="button"
											onClick={() => toggleEdit(user.user_id)}
										>
											{editingUserId === user.user_id
												? "Sauvegarder"
												: "Modifier"}
										</button>
										<Link to={`/admin/utilisateurs/supprimer/${user.user_id}`}>
											Supprimer
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
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
