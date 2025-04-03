import Server from "../../src/core/server";
import { describe, it, expect } from "vitest";
import supertest from "supertest";

describe("user controller tests suite", () => {
	it("should responds with 200 code status", async () => {
		// arrange
		const expected = 200;

		// act
		const sut = await supertest(new Server().create()).get("/user");

		const actual = sut.status;

		console.log(actual);

		// assert
		expect(actual).toBe(expected);
	});
});
