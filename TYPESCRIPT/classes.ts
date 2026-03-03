// /////////////////////////////////classes in typscrip
// class Person {
//     name:string;
//     age:number;

//     constructor(name:string,age:number){
//         this.name = name;
//         this.age = age;
//     }
// //     greet():void{
// //         console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);

// //     }
// }
// const obj1  = new Person('Anmol',50);
// const obj2  = new Person('Happy',40);

// console.log(obj1);
// console.log(obj2);
// getName(obj1);
// function getName(obj:Person){
//     console.log(obj.name);
// }


// console.log(obj1.name);
///////////generic templtet
function value(a:number|string|number[]):number|string|number[]{
    return a;

}
console.log(value(45));
console.log("Anmol")
console.log([4,6,7,9,23,,8,9,0]); 
function                                                                