//R-TASK
console.log("R-TASK javiblari");

//Shunday function yozing, 
// u string parametrga ega bolsin. 
// String "1+2" holatda pass qilinganda string ichidagi sonlar yigindisini number holatda qaytarsin.
//  MASALAN: calculate("1+3") return 4.

function calculate(str: string): number {
    const sonlar = str.split("+");
    let sum = 0;

    for (let i = 0; i < sonlar.length; i++) {
        sum += Number(sonlar[i]);
    }

    return sum;
}

console.log(calculate("1+3"));  
console.log(calculate("1+2+3")); 

//Q-TASK
// console.log("Q-TASK javiblari");

// Shunday function yozing,
//  u 2 ta parametrgga ega bolib birinchisi object,
//  ikkinchisi string. 
// Agar string parametr objectni propertysi bolsa 
// true bolmasa false qaytarsin. 
// MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") 
// return true; hasProperty({name: "BMW", model: "M3"}, "year") return false.

// function hasProperty (obj: Record<string, any>, key: string): boolean {
//   let kalitlar = Object.keys(obj);
//   return kalitlar.includes(key)
// }
// console.log(hasProperty({name: "BMW", model: "M3"}, "model"))
// console.log(hasProperty({name: "BMW", model: "M3"}, "year"))

//P-TASK
// console.log("P-TASK javiblari");

// P-TASK
// Shunday function yozing, 
// u object qabul qilsin va arrayni object arrayga otkazib 
// arrayni qaytarsin.
//  MASALAN: objectToArray({a: 10, b: 20}) return [["a", 10], ["b", 20]].

// function objectToArray(obj: Record<string, number>): [string, number][] {
//     let kalitlar = Object.keys(obj);
//     let natija: [string, number][] = [];

//     for (let i = 0; i < kalitlar.length; i++) {
//         natija.push([kalitlar[i], obj[kalitlar[i]]]);
//     }

//     return natija;
// }

// console.log(objectToArray({a: 10, b: 20}));

//O-TASK
// console.log("O-TASK javiblari");
//Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va  
// array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin. 
// MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45.

// function calculateSumOfNumbers(arr: any[]): number {
//     let sum = 0;

//     for (let i = 0; i < arr.length; i++) {
//         if (typeof arr[i] === "number") {
//             sum += arr[i];
//         }
//     }

//     return sum;
// }

// console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]));


/* Project Standarts:
  - Logging standrts
  - Naming standarts:
      function, method, variable => CAMEL    goHome
      class => PASCAL                        MemberService
      folder => KEBAB
      css => SNAKE                           button_style
  - Error handling
*/


// N-TASK
//console.log("N-TASK javiblari");

//N-TASK
//Shunday function yozing, 
// u string qabul qilsin va string palindrom yani togri oqilganda ham, 
// orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin. 
// MASALAN: palindromCheck("dad") return true; palindromCheck("son") return false.


// function palindromCheck(input: string): boolean {
//     const reverseInput = input.split("").reverse().join("");

//     return input === reverseInput;
// }

// console.log(palindromCheck("mam"))


// M-TASK
// console.log("M-TASK javiblari");

// M-TASK

// Shunday function yozing,
//  u raqamlardan tashkil topgan array qabul qilsin va 
// array ichidagi har bir raqam uchun raqamni ozi va
//  hamda osha raqamni kvadratidan tashkil topgan object hosil qilib,
//  hosil bolgan objectlarni array ichida qaytarsin.
//  MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}].

// interface SquareNumber {
//     number: number;
//     square: number;
// }

// function getSquareNumbers(arr: number[]): SquareNumber[] {
//     let natija: SquareNumber[] = [];

//     for (let i = 0; i < arr.length; i++) {
//         let son = { number: arr[i], square: arr[i] ** 2 }
//         natija.push(son)
//     }
//     return natija
// }
// console.log(getSquareNumbers([1, 2, 3,]))
