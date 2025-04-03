import { useContext, useEffect } from "react";
import { UserContext } from "../provider/UserProvider";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		// supprimer l'utilisateur

		localStorage.removeItem("token");
		localStorage.removeItem("user");

		setUser(null);

		// redirection
		navigate("/");
	}, [setUser, navigate]);

	return <div>Déconnexion en cours...</div>;
};

export default LogoutPage;
