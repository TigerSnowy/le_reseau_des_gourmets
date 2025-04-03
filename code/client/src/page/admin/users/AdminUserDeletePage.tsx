import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import SecurityAPI from "../../../service/security_api";
import { UserContext } from "../../../provider/UserProvider";
import { useContext } from "react";
import type User from "../../../model/user";
import UserAPI from "../../../service/user_api";

const AdminUserDeletePage = () => {
	// récupérer l'id dans l'URL
	const { id } = useParams();

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		// créer le formData
		const formData = new FormData();
		formData.append("user_id", id as unknown as string);

		new SecurityAPI().auth(user as User).then((authResponse) => {
			console.log(authResponse.data.token);

			new UserAPI()
				.delete(formData, authResponse.data.token)
				.then((response) => {
					window.sessionStorage.setItem("notice", "Utilisateur supprimé");

					// redirection
					navigate("/admin/utilisateur");
				});
		});

		// new SecurityAPI().auth(user as User).then((authResponse) => {
		// 	console.log(authResponse.data.token);
		// });

		// new UserAPI().delete(formData, authResponse.data.token).then((response) => {
		// 	navigate("/admin/utilisateurs");
		// });
	}, [id, user, navigate]);

	return <></>;
};

export default AdminUserDeletePage;
