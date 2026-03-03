"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////////////////classes in typscrip
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const obj1 = new Person('Anmol', 50);
const obj2 = new Person('Happy', 40);
console.log(obj1);
console.log(obj2);
getName(obj1);
function getName(obj) {
    console.log(obj.name);
}
