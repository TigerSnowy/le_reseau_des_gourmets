// reprendre STRICTEMENT le nom des colonnes SQL
// model : données associées à un objet
// ex: table Role => objets = role_id, name, image
//                   propriétés = admin, user, logo-admin.png,logo-user.png

import type Ingredient from "./ingredient.js";
import type Picture from "./picture.js";
import type User from "./user.js";

type Recipe = {
	recipe_id: number;
	title: string;
	preparation_time?: string | null;
	cooking_time?: string | null;
	difficulty?: "facile" | "moyen" | "difficile" | null;
	description?: string | null;
	share_token?: string | null;
	user_id: number;
	user: User;

	picture_ids: string;
	pictures: Picture[];
};

export default Recipe;
