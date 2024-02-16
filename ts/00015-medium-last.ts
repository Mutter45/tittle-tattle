type arr1 = ['a', 'b', 'c'];
type arr2 = [];
// type Last<T extends any[]> = T extends [...infer _, infer A] ? A : never;
type Last<T extends any[]> = [any, ...T][T['length']];
type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
