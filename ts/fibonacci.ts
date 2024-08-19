/**
 * 斐波那契数列
 * @param { number } n 斐波那契数列的第n项
 * @returns { number} 斐波那契数列的第n项
 */
// function fibonacci(n: number): number {
// 	let arr: number[] = []
// 	for (let i = 0; i < n; i++) {
// 		if (i < 2) {
// 			arr.push(1)
// 		} else {
// 			arr.push(arr[i - 1] + arr[i - 2])
// 		}
// 	}
// 	return arr.at(-1)
// }
/**
 * 斐波那契数列
 * @param { number } n 斐波那契数列的第n项
 * @returns { number} 斐波那契数列的第n项
 */
function fibonacci(n: number): number {
	if (n < 2) {
		return 1
	} else {
		return fibonacci(n - 1) + fibonacci(n - 2)
	}
}
