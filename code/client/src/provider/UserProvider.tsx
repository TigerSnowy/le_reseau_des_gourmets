// créer un contexte - une donnée associée à un provider (composant)

import { createContext, useState } from "react";
import type UserProviderContext from "../model/context/UserProviderContext";
import type UserProviderProps from "../model/props/user_provider_props";
import type User from "../model/user";

const UserContext = createContext({} as UserProviderContext);

// provider = un composant qui contient un context
// children représente les composants enfants du Provider
const UserProvider = ({ children }: UserProviderProps) => {
	// état stockant l'utilisateur connecté
	const [user, setUser] = useState<User | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
