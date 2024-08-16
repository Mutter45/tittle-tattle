type arr1 = ['a', 'b', 'c']
type arr2 = []
// type Last<T extends any[]> = [any, ...T][T['length']];
// type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;
// type tail1 = Last<arr1>; // expected to be 'c'
// type tail2 = Last<arr2>; // expected to be 1
