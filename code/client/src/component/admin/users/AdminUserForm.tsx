import { useForm } from "react-hook-form";
import type User from "../../../model/user";
import styles from "../../../assets/scss/admin/adminUserForm.module.scss";
import UserAPI from "../../../service/user_api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoleAPI from "../../../service/role_api";
import type Role from "../../../model/role";

const AdminUserForm = () => {
	/*
    handleSubmit permet de gérer la soumission du formulaire
    register permet de référencer les champs de formulaire
    errors permet de gérer les messages d'erreur
    */

	// sur les cases à cocher, il faut absoluement utiliser un array

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm<User>();

	const { id } = useParams();

	const [roles, setRoles] = useState<Role[]>();

	const navigate = useNavigate();

	useEffect(() => {
		// exécuter en chaine des promesses
		Promise.allSettled([
			new RoleAPI().selectAll(),
			id ? new UserAPI().selectOne(id as unknown as number) : null,
		]).then((responses) => {
			// si la première promesse est tenue
			if (responses[0].status === "fulfilled") {
				setRoles(responses[0].value.data);
			}

			if (id && responses[1].status === "fulfilled") {
				// mettre à jour les données du formulaire
				reset(responses[1].value.data);
			}
		});
	}, [id, reset]);

	// soumission du formulaire
	// values récupère la saisie du formulaire
	/* deux types de formulaire : 
	
		- sans fichier
			- la propriété body de la requête HTTP peut être en JSON : JSON.stringify
			- dans la requête HTTP, utiliser l'en-tête HTTP : Content-Type : application/json
		- avec fichier 
			- la propriété body de la requête HTTP doit être en FormDate
			- la balse HTML <form> doit posséder l'attribut enctype="multipart/form-data"
	*/

	const onSubmitUser = async (values: User) => {
		// créer un FormData pour les FORMULAIRES AVEC FICHIER en reprenant strictement le nom des champs

		const formData = new FormData();
		formData.append("user_id", values.user_id.toString());
		formData.append("surname", values.surname);
		formData.append("first_name", values.first_name);
		formData.append("pseudo", values.pseudo);
		formData.append("email", values.email);
		formData.append("password", values.password);
		formData.append("role_id", values.role_id.toString());
		if (values.profile_picture?.length) {
			formData.append("profile_picture", values.profile_picture[0]);
		}

		// si un champ renvoie un chiffre, ajouter "as unknown as string" ou .toString() après values.qdhddab
		// un champ file renvoie une liste de fichiers (FileList) ; s'il ne faut envoyer qu'un seul fichier, ajouter [0] après le values.qdhddab

		// console.log(values);
		// console.log(formData);

		// requête HTTP
		const request = id
			? await new UserAPI().update(formData)
			: await new UserAPI().insert(formData);

		// tester le code de statut HTTP
		if ([200, 201].indexOf(request.status) > -1) {
			// redirection
			navigate("/admin/utilisateurs");
		}
	};

	return (
		<form
			className={styles.formContainer}
			onSubmit={handleSubmit(onSubmitUser)}
			encType="multipart/form-data"
		>
			<div>
				{/* reprendre STRICTEMENT le nom des colonnes SQL */}

				<select id="role_id" {...register("role_id")}>
					<option value="">Rôles</option>
					{roles?.map((role: Role) => (
						<option key={role.role_id} value={role.role_id}>
							{role.name}
						</option>
					))}
				</select>

				<label htmlFor="surname">Nom :</label>
				<input
					type="text"
					id="surname"
					{...register("surname", {
						required: "Ce champ est obligatoire.",
						minLength: {
							value: 2,
							message: "texte trop court.",
						},
					})}
				/>

				<small>{errors.surname?.message}</small>

				<label htmlFor="first_name">Prénom :</label>
				<input
					type="text"
					id="first_name"
					autoComplete="on"
					{...register("first_name", {
						required: "Ce champ est obligatoire.",
						minLength: {
							value: 2,
							message: "Texte trop court.",
						},
					})}
				/>
				<small>{errors.first_name?.message}</small>

				<label htmlFor="pseudo">Pseudo :</label>
				<input
					type="text"
					id="pseudo"
					{...register("pseudo", {
						required: "Ce champ est obligatoire.",
					})}
				/>
				<small>{errors.pseudo?.message}</small>

				<label htmlFor="email">Email :</label>
				<input
					type="email"
					id="email"
					autoComplete="email"
					{...register("email", {
						required: "Ce champ est obligatoire.",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Format d'email invalide.",
						},
					})}
				/>
				<small>{errors.email?.message}</small>

				<label htmlFor="password">Mot de passe :</label>
				<input
					type="password"
					id="password"
					{...register("password", {
						required: "Ce champ est obligatoire.",
						minLength: {
							value: 6,
							message: "Le mot de passe doit contenir au moins 6 caractères.",
						},
					})}
				/>
				<small>{errors.password?.message}</small>

				<label htmlFor="profile_picture">Photo de profil :</label>
				<input
					type="file"
					id="profile_picture"
					{...register("profile_picture")}
				/>
			</div>

			<div>
				<input type="hidden" {...register("user_id")} value={id} />
			</div>

			<button className={styles.submitButton} type="submit">
				Soumettre
			</button>
		</form>
	);
};

export default AdminUserForm;
