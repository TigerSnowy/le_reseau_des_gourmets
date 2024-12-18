// reprendre STRICTEMENT le nom des colonnes SQL
// model : données associées à un objet
// ex: table Role => objets = role_id, name, image
//                   propriétés = admin, user, logo-admin.png,logo-user.png

type RecipeIngredient = {
	id: number;
	quantity?: number | null;
	unit?:
		| "g"
		| "kg"
		| "ml"
		| "l"
		| "cs"
		| "cc"
		| "pince(s)"
		| "oz"
		| "lb"
		| null;
	recipe_id: number;
	ingredient_id: number;
};

export default RecipeIngredient;
