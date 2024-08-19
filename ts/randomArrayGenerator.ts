function createArr(newNum: number) {
	const a = Math.floor(Math.random() * newNum)
	const arrLen = Math.ceil(Math.random() * 10)
	const b = Math.floor(Math.random() * arrLen)
	let createStart = false
	const createRadNumArr = (num1: number, num2: number) => {
		let res = new Set()
		for (let i = 0; i < num1; i++) {
			res.add(Math.floor(Math.random() * num2))
		}
		return [...res]
	}
	const createRadomArr = (num: number) => {
		let arr: any[] = []

		const radNumArr = createRadNumArr(Math.ceil(Math.random() * 10) || 1, Math.ceil(Math.random() * (arrLen - 1)))
		console.log(radNumArr)
		arr = Array.from({ length: arrLen }, (_, index) => {
			if (a === num && index === b && !createStart) {
				createStart = true
				return '*'
			}
			if (radNumArr.includes(index) && num) {
				return createRadomArr(num - 1)
			}

			return Math.ceil(Math.random() * 10)
		})
		return arr
	}
	return createRadomArr(newNum)
}

// /**
//  * 找出数组中 * 的位置
//  * @param {*} arr
//  */
// function findArrStar(arr: any[]): [number, number] {}
