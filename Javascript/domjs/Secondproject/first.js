const button = document.querySelector("button");
button.addEventListener("click", () => {
  //read The Data And Then Give OutPut
  const input1 = document.getElementById("first");
  const number1 = Number(input1.value);
  const input2 = document.getElementById("second");
  const number2 = Number(input2.value);
  ///sout put
  const result = number1 + number2;
  document.getElementById("result");
  const re = document.getElementById("Result");
  re.textContent = result;
});
