// reprendre STRICTEMENT le nom des colonnes SQL
// model : données associées à un objet
// ex: table Role => objets = role_id, name, image
//                   propriétés = admin, user, logo-admin.png,logo-user.png

import type User from "./user.js";

type Post = {
	post_id: number;
	title: string;
	content: string;
	image?: string | null; // Champ nullable
	publication_date: Date;
	user_id: number; // Clé étrangère vers User
	user: User;
};

export default Post;
