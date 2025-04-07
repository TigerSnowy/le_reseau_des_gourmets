type Instruction = {
	instruction_id: number;
	step_number?: number | null;
	text: string;
	recipe_id: number;
};
export default Instruction;
