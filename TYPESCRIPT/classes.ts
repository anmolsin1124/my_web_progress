/////////////////////////////////classes in typscrip
class Person {
    name:string;
    age:number;

    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
}
const obj1  = new Person('Anmol',50);
const obj2  = new Person('Happy',40);

console.log(obj1);
console.log(obj2);
getName(obj1);
function getName(obj:Person){
    console.log(obj.name);
}

