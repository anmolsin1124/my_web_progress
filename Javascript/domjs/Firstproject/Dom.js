function timing() {
  const timer = document.getElementById("Root");
  const now = new Date();
  const IndianTime = now.toLocaleTimeString().toUpperCase();
  timer.innerHTML = IndianTime;
}
setInterval(timing, 1000);

const timer = document.getElementById("Root");

timer.style.fontSize = "230px";
timer.style.display = "flex";
timer.style.justifyContent = "center";
timer.style.alignItems = "center";
timer.style.height = "100vh";
timer.style.fontWeight = "500px";
