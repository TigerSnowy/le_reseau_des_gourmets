import { useContext, useEffect } from "react";
import { UserContext } from "../provider/UserProvider";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		// supprimer l'utilisateur
		setUser(null);

		localStorage.removeItem("token");
		localStorage.removeItem("user");

		// redirection
		navigate("/");
	}, [setUser, navigate]);

	return <></>;
};

export default LogoutPage;
