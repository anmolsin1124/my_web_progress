// interface Person{
//     name:string,
//     age:number,
//     gender:string,
//     aadhar?:number
// }


// const obj:Person = {
//     name:"Rohit",
//     age:20,
//     gender:"Male",  
// }


// // Latest example

// interface customer {
//     name:string,
//     age:number,
//     balance:number
// }

// const obj2: Readonly<customer> = {
//     name:"Rohit",
//     balance:210,
//     age:20
// }

// // Partial: All property becomes optional
// // Required: ALl property should be filled
// // Readonly: The property can only be read, write option is not available


// // array of Objects

// interface peopele {name:string,age:number};
// interface manager {salary:number,id:string}

// const arr: (peopele | manager)[] = [{name:"Rohit",age:20},{name:"Mohit",age:18}, {salary:20,id:"2321"}]

// // function in TS


// function greet(a:number):number{
//     console.log(a);
//     return a+5;
// }

// console.log(greet(10));


// function meet(msg:string,val:number):void{
//     console.log(msg,val);
// }


// meet("Anshika Verma", 4);
// // default parameter
// function neet(msg:string = "Jit"){
//     console.log(msg);
// }

// neet();
// neet("Bittu");


// // Optional Parameter

// function GATE(person?:string){
//     console.log(person||"Mohan");
// }

// GATE("Rohit");
// GATE();


// // arrow function

// const sum = (a:number,b:number):number=>{
//     return a+b;
// }

// console.log(sum(3,4));

 


function placeorder(order:number,callback:(ammount:number)=>void){
    const ammount = order+10;
     callback(ammount);
}
placeorder(45,(ammount)=>{
    console.log(ammount)
});