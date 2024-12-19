// reprendre STRICTEMENT le nom des colonnes SQL
// model : données associées à un objet
// ex: table Role => objets = role_id, name, image
//                   propriétés = admin, user, logo-admin.png,logo-user.png

import type Recipe from "./recipe.js";
import type Role from "./role.js";
import type ShareType from "./share_type.js";

type User = {
	user_id: number;
	pseudo: string;
	surname: string;
	first_name: string;
	email: string;
	password: string;
	profile_picture?: string | null; // Champ nullable
	profile_background?: string | null; // Champ nullable
	subscription_date: Date;
	role_id: number; // Clé étrangère vers Role
	role: Role;

	recipe_share_id: string;
	recipe_share: Recipe[];

	share_type_ids: string;
	share_type: ShareType[];
};

export default User;
