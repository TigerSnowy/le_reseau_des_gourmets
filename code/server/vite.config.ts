import { defineConfig } from "vite";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
	// charger le fichier .env.test
	dotenv.config({ path: ".env.test" });

	return {};
});
