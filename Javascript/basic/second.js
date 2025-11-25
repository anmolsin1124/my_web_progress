const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10];
// console.log(arr);
// console.log(arr.length);
// console.log("\n");
// const newarr = structuredClone(arr);
// console.log(newarr);
///////pUsh all elements in array int he dyanmaic
// arr.push(254);
// console.log(arr);
// arr.pop();
// console.log(arr);
// arr.unshift(54);
// console.log(arr);
// arr.shift();
// console.log(arr);
let newarr = [2, 7, 3, 2, 6, 8, 5, 9];
// console.log(arr.splice(0, 4));
// console.log(arr);
// console.log(arr.join(" <-=-> "));

let arr2 = arr.concat(newarr);
// console.log(arr2);
const arr2d = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// console.log(arr2d);
// for (let i = 0; i < arr2d.length; i++) {
//   for (let j = 0; j < arr2d.length; j++) {
//     console.log([arr2d[i][j]]);
//     console.log("\n");
//   }
// }
let narray = arr2.flat(Infinity);
console.log(arr2d);
