// reprendre STRICTEMENT le nom des colonnes SQL
// model : données associées à un objet
// ex: table Role => objets = role_id, name, image
//                   propriétés = admin, user, logo-admin.png,logo-user.png

type Ingredient = {
	ingredient_id: number;
	name: string;
	quantity?: string;
	unit?:
		| "mg"
		| "g"
		| "kg"
		| "ml"
		| "cl"
		| "l"
		| "càc"
		| "càs"
		| "pincée"
		| "oz"
		| "lb"
		| "unité"
		| null;
	recipe_id: number;
};

export default Ingredient;
