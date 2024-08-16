type First<T extends any[]> = T extends [infer L, ...any[]] ? L : never
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never
function compose<Fns extends Array<(...args: any[]) => any>>(...fns: Fns) {
	return function <K extends Parameters<Last<Fns>>>(...args: K): ReturnType<First<Fns>> {
		return fns.reduceRight((params, fn) => {
			return fn(params)
		}, fns.pop()?.(...args))
	}
}

// 示例函数
function power(x: number): number {
	return Math.pow(x, 2)
}

function add(x: number, y: number): number {
	return x + y
}
function string(x: number): string {
	return x.toString()
}

const combinationFn = compose(string, power, add)

// // 使用示例
const result = combinationFn(5, 3)
console.log(result)
