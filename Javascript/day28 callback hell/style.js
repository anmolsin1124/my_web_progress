function fetchUser(callback) {
  console.log("fetching user");
  setTimeout(() => {
    console.log("user fetched");
    const obj = {
      name: "Anmol",
      age: 45,
      city: "Hapur",
    };
    callback(obj);

    // meet(name);
  }, 2000);
}

function greet(obj) {
  console.log("Hello " + obj.age);
}
function meet(obj) {
  console.log(`Hello ${obj.name}, nice to meet you!`);
}
function printage(obj) {
  console.log(`This Is Your Age ${obj.age}`);
}
function edit(obj) {
  console.log(`edit ${obj.name}, The User is being edited`);
}

// fetchUser(greet);
// fetchUser(meet);
fetchUser(edit);
