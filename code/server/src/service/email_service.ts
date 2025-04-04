import nodemailer from "nodemailer";

interface ContactFormData {
	name: string;
	email: string;
	subject?: string;
	message: string;
}

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

export const sendMailConfirmation = async (to: string) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject:
			"[Le Réseau des Gourmets] Confirmation de réception de votre message",
		html: `
            <!DOCTYPE html>
                <html lang="fr">
                    <head>
                    <meta charset="UTF-8" />
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        background-color: #f9f9f9;
                        padding: 20px;
                        line-height: 1.6;
                        }
                        .container {
                        max-width: 600px;
                        margin: auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        padding: 30px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                        }
                        .header {
                        text-align: center;
                        margin-bottom: 20px;
                        }
                        .footer {
                        margin-top: 30px;
                        font-size: 14px;
                        color: #888;
                        text-align: center;
                        }
                        .emoji {
                        font-size: 20px;
                        }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <div class="header">
                        <h2>Confirmation de réception de votre message</h2>
                        </div>

                        <p>Bonjour,</p>

                        <p>
                        Nous avons bien reçu votre message via le formulaire de contact de
                        <strong>Le Réseau des Gourmets</strong>. Merci de nous avoir écrit&nbsp;!
                        </p>

                        <p>
                        Que ce soit pour une question, une suggestion, un problème technique ou
                        une demande liée à vos données personnelles, votre message est important
                        pour nous.
                        </p>

                        <p>
                        Nous reviendrons vers vous dans les plus brefs délais.<br />
                        En attendant, n'hésitez pas à consulter notre site ou à nous écrire de
                        nouveau si nécessaire.
                        </p>

                        <p class="emoji">À bientôt sur <strong>Le Réseau des Gourmets</strong> 🍽️</p>

                        <div class="footer">
                        —
                        <br />
                        L’équipe du Réseau des Gourmets
                        <br />
                        Ce message est généré automatiquement, merci de ne pas y répondre.
                        <br />
                        Si vous n'êtes pas l'auteur de ce message, veuillez ignorer cet e-mail.
                        </div>
                    </div>
                    </body>
                </html>
        `,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Mail de confirmation envoyé à", to);
	} catch (error) {
		console.error("Erreur lors de l'envoi du mail de confirmation:", error);
	}
};

export const sendMailToAdmin = async (formData: ContactFormData) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: process.env.EMAIL_USER,
		subject: `[Le Réseau des Gourmets] Nouveau message: ${formData.subject || "Sans sujet"}`,
		html: `
			<!DOCTYPE html>
			<html lang="fr">
				<head>
					<meta charset="UTF-8" />
					<style>
						body {
							font-family: Arial, sans-serif;
							color: #333;
							background-color: #f9f9f9;
							padding: 20px;
							line-height: 1.6;
						}
						.container {
							max-width: 600px;
							margin: auto;
							background-color: #ffffff;
							border-radius: 8px;
							padding: 30px;
							box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
						}
						.header {
							text-align: center;
							margin-bottom: 20px;
						}
						.message-details {
							margin-bottom: 20px;
							padding: 15px;
							background-color: #f5f5f5;
							border-radius: 5px;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<div class="header">
							<h2>Nouveau message de contact</h2>
						</div>
						
						<div class="message-details">
							<p><strong>De:</strong> ${formData.name} (${formData.email})</p>
							<p><strong>Sujet:</strong> ${formData.subject || "Sans sujet"}</p>
							<p><strong>Message:</strong></p>
							<p>${formData.message.replace(/\n/g, "<br>")}</p>
						</div>
						
						<p>Ce message a été reçu via le formulaire de contact du site Le Réseau des Gourmets.</p>
					</div>
				</body>
			</html>
		`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log(
			"Mail envoyé à l'administrateur concernant le message de",
			formData.email,
		);
	} catch (error) {
		console.error("Erreur lors de l'envoi du mail à l'administrateur:", error);
		throw error;
	}
};
