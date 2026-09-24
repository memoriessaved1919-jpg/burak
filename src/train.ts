
// M-TASK
// console.log("M-TASK javiblari");

// M-TASK

// Shunday function yozing,
//  u raqamlardan tashkil topgan array qabul qilsin va 
// array ichidagi har bir raqam uchun raqamni ozi va
//  hamda osha raqamni kvadratidan tashkil topgan object hosil qilib,
//  hosil bolgan objectlarni array ichida qaytarsin.
//  MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}].

interface SquareNumber {
    number: number;
    square: number;
}

function getSquareNumbers(arr: number[]): SquareNumber[] {
    let natija: SquareNumber[] = [];

    for (let i = 0; i < arr.length; i++) {
        let son = { number: arr[i], square: arr[i] ** 2 }
        natija.push(son)
    }
    return natija
}
console.log(getSquareNumbers([1, 2, 3,]))
