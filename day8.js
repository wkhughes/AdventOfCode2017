(() => {
  const createInstruction = (register, operator, operand) => ({ register, operator, operand });
  const parseInstruction = instructionParts => ({
    operation: createInstruction(instructionParts[0], instructionParts[1], Number(instructionParts[2])),
    condition: createInstruction(instructionParts[4], instructionParts[5], Number(instructionParts[6]))
  });
  const conditionPasses = (registers, condition) => eval(`${registers[condition.register] || 0} ${condition.operator} ${condition.operand}`);
  const incrementRegister = (registers, register, amount) => ({ ...registers, [register]: (registers[register] || 0) + amount });
  const applyOperation = (registers, operation) => incrementRegister(registers, operation.register, operation.operand * (operation.operator === "inc" ? 1 : -1));
  const applyOperationIfConditionPasses = (registers, condition, operation) => conditionPasses(registers, condition) ? applyOperation(registers, operation) : registers;
  const maxRegisterValue = registers => Math.max(...Object.values(registers));
  const run = instructions => instructions.reduce(({ registers, maxValueSeen }, { condition, operation }) => ({
    registers: applyOperationIfConditionPasses(registers, condition, operation),
    maxValueSeen: Math.max(maxValueSeen, maxRegisterValue(registers))
  }), { registers: {}, maxValueSeen: 0 });
  
  const input = document.body.textContent.trim();
  const instructions = input.split("\n").map(instruction => instruction.split(" ")).map(parseInstruction);
  
  const state = run(instructions);
  const maxFinalRegisterValue = maxRegisterValue(state.registers);
  const maxRegisterValueSeen = state.maxValueSeen;
  
  console.log("Part 1 Solution: " + maxFinalRegisterValue + "\nPart 2 Solution: " + maxRegisterValueSeen);
})();