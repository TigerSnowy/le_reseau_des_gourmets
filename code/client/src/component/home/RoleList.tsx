import { useEffect, useState } from "react";
import RoleAPI from "../../service/role_api";
import type Role from "../../model/role";

const RoleList = () => {
	// état pour stocker les résultats de la requête HTTP
	const [roles, setRoles] = useState<Role[]>([]);

	// usEffect permet de déclencher des instructions à un moment de vie d'un composant
	// - affiché
	// - mise à jour avec un état
	// - désaffiché

	useEffect(() => {
		// récupérer tous les enregistrements
		// the permet de récupérer les données d'une promesse lorsque la fonction n'est pas asynchrone
		new RoleAPI().selectAll().then((results) => setRoles(results.data));
	}, []);

	return (
		<>
			{/* map est la seule boucle disponible dans le HTML de react */}
			{/* les accolades dans le HTML permettent de séparer la partie HTML de la partie JS */}

			{roles.map((result) => (
				<article key={Math.random()}>
					<h2>{result.name}</h2>
				</article>
			))}
		</>
	);
};

export default RoleList;
