/*
 * @Author: [JokerChen]
 * @Date: 2021-07-10 15:14:37
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-16 18:57:17
 * @Description: 
 * for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，
 * for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。
 */
let pets  = new Set(["Cat", "Dog", "Horse"]);
// pets["species"] = "mammals";
for (let pet in pets) {
  console.log(pet); // "species"
}

for (let pet of pets) {
  console.log(pet); // "Cat", "Dog", "Hamster"
}