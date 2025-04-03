// describe permet de créer des groupes de tests
// it permet d'écrire un test
// expect permet de créer une assertion (une affirmation)

import { describe, it, expect } from "vitest";

// créer une suite de tests
describe("tests suite", () => {
	// créer un test
	it("my addition works", () => {
		// assert
		expect(1 + 1).toBe(2);
		expect(1 + 1).not.toBe(3);
	});
});
