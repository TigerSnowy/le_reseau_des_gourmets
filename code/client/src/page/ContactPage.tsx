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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Tu pourras ici appeler ton endpoint vers MongoDB
		setSubmitted(true);
	};

	return (
		<div className={styles.contactFormContainer}>
			<h2>À votre écoute</h2>
			{submitted ? (
				<p className={styles.success}>Merci pour votre message !</p>
			) : (
				<form onSubmit={handleSubmit} className={styles.form}>
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

					<button type="submit">Envoyer</button>
				</form>
			)}
		</div>
	);
};

export default ContactPage;
