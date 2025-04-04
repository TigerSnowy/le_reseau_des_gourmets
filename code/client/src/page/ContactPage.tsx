import styles from "../assets/scss/contact/contact.module.scss";
import { type FormEvent, useState } from "react";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				console.log("Message envoyé avec succès:", data);
				setSubmitted(true);
			} else {
				console.error("Erreur lors de l'envoi du message:", data);
				setError("Une erreur est survenue. Veuillez réessayer.");
			}
		} catch (err) {
			console.error("Erreur lors de l'envoi du message:", err);
			setError(
				"Une erreur est survenue. Veuillez vérifier votre connexion internet et réessayer.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.contactFormContainer}>
			<h2>À votre écoute</h2>
			{submitted ? (
				<p className={styles.success}>Merci pour votre message !</p>
			) : (
				<form onSubmit={handleSubmit} className={styles.form}>
					{error && <p className={styles.error}>{error}</p>}

					<label htmlFor="name" className={styles.hideLabel}>
						Nom
					</label>
					<input
						id="name"
						type="text"
						name="name"
						placeholder="Nom"
						value={formData.name}
						onChange={handleChange}
						required
					/>

					<label htmlFor="email" className={styles.hideLabel}>
						Email
					</label>
					<input
						id="email"
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<label htmlFor="subject" className={styles.hideLabel}>
						Sujet
					</label>
					<input
						id="subject"
						type="text"
						name="subject"
						placeholder="Sujet"
						value={formData.subject}
						onChange={handleChange}
					/>

					<label htmlFor="message" className={styles.hideLabel}>
						Message
					</label>
					<textarea
						id="message"
						name="message"
						placeholder="Votre message..."
						value={formData.message}
						onChange={handleChange}
						required
					/>

					<button type="submit" disabled={isLoading}>
						{isLoading ? "Envoi en cours..." : "Envoyer"}
					</button>
				</form>
			)}
		</div>
	);
};

export default ContactPage;
