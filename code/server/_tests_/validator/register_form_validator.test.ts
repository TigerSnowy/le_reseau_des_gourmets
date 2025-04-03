import { describe, it, expect } from "vitest";
import RegisterFormValidator from "../../src/validator/register_form_validator";

describe("register form validator tests suite", () => {
	it("should be valid", async () => {
		// arrange
		const sut = new RegisterFormValidator();
		const expected = {
			pseudo: "Hello",
			surname: "hello",
			first_name: "chiao",
			email: "chiao@gmail.com",
			password: "hellochiao",
			profile_picture: "",
		};

		const body = {
			pseudo: "Hello",
			surname: "hello",
			first_name: "chiao",
			email: "chiao@gmail.com",
			password: "hellochiao",
			profile_picture: "",
		};

		// act
		const actual = await sut.isValid(body);

		// console.log(actual);

		// assert
		expect(actual).toEqual(expected);
	});

	it("should be unvalid", async () => {
		const sut = new RegisterFormValidator();

		const body = {
			pseudo: "Hello",
			surname: "hello",
			first_name: "chiao",
			email: "chiaogmail.com",
			password: "hellochiao",
			profile_picture: "",
		};

		// act
		const actual = await sut.isValid(body);
		expect(actual).toBeInstanceOf(Error);
	});
});
