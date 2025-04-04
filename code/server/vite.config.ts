import { defineConfig } from "vite";
import dotenv from "dotenv";

export default defineConfig(() => {
	// charger le fichier .env.test
	dotenv.config({ path: ".env.test" });

	// utiliser le serveur MySQL de GitHub Actions
	if (process.env.GITHUB_ACTIONS) {
		process.env.MYSQL_HOST = "127.0.0.1";
	}
	return {};
});
