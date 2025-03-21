// typer les données (ex: états, fonctions, gestionnaires d'états...) contenues dans le contexte

import type { Dispatch, SetStateAction } from "react";
import type User from "../user";

type UserProviderContext = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
};

export default UserProviderContext;
