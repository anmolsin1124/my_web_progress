document.querySelector("button").addEventListener("click", () => {
  const place = document.getElementById("location").value;
  function updatetemp(data) {
    const element = document.getElementById("weatherInfo");
    element.innerHTML = `Today Temperature Is ${data.current.temp_f}`;
  }
  const prom = fetch(
    `http://api.weatherapi.com/v1/current.json?key=8b41fb6f41a046f590243541260103&q=${place}&aqi=yes,`,
  );

  prom.then((response) => response.json()).then((data) => updatetemp(data));
});
