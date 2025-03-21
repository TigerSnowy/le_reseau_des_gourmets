// reprendre STRICTEMENT le nom des colonnes SQL
// model : données associées à un objet
// ex: table Role => objets = role_id, name, image
//                   propriétés = admin, user, logo-admin.png,logo-user.png

type Role = {
	role_id: number;
	name: string;
};

export default Role;

// type User = {
// 	user_id: number;
// 	pseudo: string;
// 	surname: string;
// 	first_name: string;
// 	email: string;
// 	password: string;
// 	profil_picture: string;
// 	profile_background: string;
// 	subscription_date: number;
// }
