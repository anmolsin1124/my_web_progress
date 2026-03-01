// const obj = fetch(
//   "http://api.weatherapi.com/v1/current.json?key=8b41fb6f41a046f590243541260103&q=India&aqi=yes",
// );
// setTimeout(() => {
//   console.log(promise);
// }, 2000);
// obj
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// obj.then((response) => {
//   const pro2 = response.json();
//   pro2.then((data) => {
//     console.log(data);
//   });
// });
// obj.then((response) => response.json()).then((data) => console.log(data));
const obj = fetch(
  "http://api.weatherapi.com/v1/current.json?key=8b41fb6f41a046f590243541260103&q=India&aqi=yes",
)
  .then((response) => response.json())
  .then((data) => console.log(data.current.temp_f))
  .catch((error) => console.log(error));
