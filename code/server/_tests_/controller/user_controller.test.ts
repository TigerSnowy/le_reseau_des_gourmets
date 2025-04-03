import Server from "../../src/core/server";
import { describe, it, expect } from "vitest";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import { response } from "express";

describe("user controller tests suite", () => {
	const admin = {
		user_id: 1,
		pseudo: "Tigy",
		surname: "Ferreira",
		first_name: "Ines",
		email: "ines@gmail.com",
		password:
			"9712094e8d5c62e54b7ebd4349ca3e790d90a68265e87f26aa8cb1f321abc3d5aafNuoIuna5j+bvMzwYvvw==061197d555d5c2acfc9e126f7b3a2165e1e7a3c30d24f8e496dcdf95faffc48d",
		profile_picture: "4efb82a314dcbcfe83870c91a3cb9161.jpeg",
		role_id: 1,
		role: {
			role_id: 1,
			name: "admin",
		},
		key: "601a9e8ad83a5162594ba3c8ff163f2d",
	};

	const token = jwt.sign({ user: admin }, process.env.JWT_KEY as string, {
		expiresIn: 30,
	});

	const values = {
		pseudo: "Testy",
		surname: "Testtest",
		first_name: "Test",
		email: "test@gmail.com",
		password: "testtest",
		profile_picture: "",
		role_id: "2",
	};

	it("should responds with 200 code status", async () => {
		// arrange
		const expected = 200;
		const notExpected = 404;

		// act
		const sut = await supertest(new Server().create()).get("/user");

		const actual = sut.status;

		console.log(actual);

		// assert
		expect(actual).toBe(expected);
		expect(actual).not.toBe(notExpected);
	});

	it("should get one user", async () => {
		// arrange
		const expected = 1;

		// act
		const sut = await supertest(new Server().create()).get("/user/1");

		const actual = sut.body.data.user_id;

		// assert
		expect(actual).toBe(expected);
	});

	it("should create a new user", async () => {
		// arrange
		const expected = 201;

		// act
		// si le formulaire possède un fichier : utiliser les méthodes fiel et attach
		// si le formulaire ne possède pas de fichier : utiliser la méthode send

		const sut = await supertest(new Server().create())
			.post("/user")
			.auth(token, { type: "bearer" })

			// sans fichier : .send(values)

			.field("pseudo", Math.random() + values.pseudo)
			.field("surname", values.surname)
			.field("first_name", values.first_name)
			.field("email", Math.random() + values.email)
			.field("password", values.password)
			.field("role", values.role_id);

		const actual = sut.status;

		expect(actual).toBe(expected);
	});
});
