import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import UserAPI from "../../../service/user_api";

const AdminUserDeletePage = () => {
	// récupérer l'id dans l'URL
	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		// créer le formData
		const formData = new FormData();
		formData.append("user_id", id as unknown as string);

		new UserAPI().delete(formData).then((response) => {
			navigate("/admin/utilisateurs");
		});
	}, [id, navigate]);

	return <></>;
};

export default AdminUserDeletePage;
