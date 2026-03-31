import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function PasswordGenerator() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [numberChanged, setnumberChanged] = useState(false);
  const [charChanged, setcharChanged] = useState(false);

  const generatepassword = useCallback(() => {

    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberChanged) str += "0123456789";
    if (charChanged) str += "+-)(*&^%$#@!~`{}";

    let pass = "";

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }

    setPassword(pass);

  }, [length, charChanged, numberChanged]);

  useEffect(() => {
    generatepassword();
  }, [generatepassword]);

  return (
    <>
      <h1>{password}</h1>

      <div className="second">
        <input
          type="range"
          min={5}
          max={50}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <label>Length ({length})</label>

        <input
          type="checkbox"
          checked={numberChanged}
          onChange={() => setnumberChanged(!numberChanged)}
        />
        <label>Number</label>

        <input
          type="checkbox"
          checked={charChanged}
          onChange={() => setcharChanged(!charChanged)}
        />
        <label>Character</label>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <PasswordGenerator />
);