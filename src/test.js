function testMixArray() {
  console.assert(
    JSON.stringify(mixArray([10, 4, 7])) !== JSON.stringify([10, 4, 7]),
    "Mix array failed"
  );
}

function testCreateArrayOfNumbers() {
  console.assert(
    JSON.stringify(createArrayOfNumbers(10, 5)) ===
      JSON.stringify([5, 6, 7, 8, 9, 10]),
    "Array of numbers failed to create"
  );
}

testMixArray();
testCreateArrayOfNumbers();
