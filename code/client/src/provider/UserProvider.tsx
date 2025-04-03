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

	const updateUserAvatar = (newAvatar: string) => {
		if (user) {
			const updatedUser = {
				...user,
				profile_picture: newAvatar,
			};
			setUser(updatedUser);

			// Mettre à jour dans localStorage
			localStorage.setItem("user", JSON.stringify(updatedUser));
		}
	};

	return (
		<UserContext.Provider value={{ user, setUser, updateUserAvatar }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
