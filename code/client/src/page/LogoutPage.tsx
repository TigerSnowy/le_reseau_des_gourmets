import { useContext, useEffect } from "react";
import { UserContext } from "../provider/UserProvider";
import type User from "../model/user";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		// supprimer l'utilisateur
		setUser({} as User);

		// redirection
		navigate("/");
	}, [setUser, navigate]);
	return <></>;
};

export default LogoutPage;
