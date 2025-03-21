// reprendre STRICTEMENT le nom des colonnes SQL
// model : données associées à un objet
// ex: table Role => objets = role_id, name, image
//                   propriétés = admin, user, logo-admin.png,logo-user.png

import type Role from "./role.js";

type User = {
	user_id: number;
	pseudo: string;
	surname: string;
	first_name: string;
	email: string;
	password: string;
	profile_picture?: string | null; // Champ nullable
	role_id: number; // Clé étrangère vers Role
	role: Role;
} | null;

export default User;
