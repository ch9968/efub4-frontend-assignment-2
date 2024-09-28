type isStringType<T> = T extends string ? string[] : number[];
type T1 = isStringType<string>;
type T2 = isStringType<number>;

const a: T1 = ["EFUB", "최고야!", "짱"];
const b: T2 = [2, 3, 4, 5];

console.log(a);
console.log(b);
