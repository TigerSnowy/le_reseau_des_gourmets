import { useContext, useEffect } from "react";
import type GuardProps from "../../model/props/guard_props";
import { UserContext } from "../../provider/UserProvider";
import { useNavigate } from "react-router-dom";

const Guard = ({ children, roles }: GuardProps) => {
	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		// tester le rôle de l'utilisateur
		if (!user || !user.role?.name || roles.indexOf(user.role.name) === -1) {
			// stocker un message dans la session
			window.sessionStorage.setItem("notice", "Accés refusé");

			// redirection
			navigate("/");
		}
	}, [roles, user, navigate]);

	return <>{children}</>;
};

export default Guard;
