// reprendre STRICTEMENT le nom des colonnes SQL
// model : données associées à un objet
// ex: table Role => objets = role_id, name, image
//                   propriétés = admin, user, logo-admin.png,logo-user.png

import type Picture from "./picture.js";

type RecipePicture = {
	recipe_id: number;
	picture_id: number;
	picture: Picture;
};

export default RecipePicture;
