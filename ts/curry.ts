// type Args<T extends (...args: any) => any, K extends Array<any>> = {
// 	[I in keyof K];
// };
function curry<T extends (...args: any) => any>(fn: T) {
	return function curriedFn<K extends Array<any>>(...args: K) {
		return args.length >= fn.length ? fn(...args) : (...moreArgs: any[]) => curriedFn(...args, ...moreArgs);
	};
}

function addTest(x: number, y: number, z: number): number {
	return x + y + z;
}

const addCurry = curry(addTest);
console.log(addCurry(1, 2));
