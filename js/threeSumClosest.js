function threeSumClosest(nums, target) {
	let min = Infinity
	nums.sort((a, b) => a - b)
	for (let i = 0; i < nums.length - 1; i++) {
		let left = i + 1,
			right = nums.length - 1
		while (left < right) {
			let sum = nums[i] + nums[left] + nums[right]
			if (Math.abs(sum - target) < Math.abs(min - target)) {
				min = sum
			}
			if (sum === target) {
				return min
			} else if (sum > target) {
				right--
			} else {
				left++
			}
		}
	}
	return min
}
let nums = [4, 0, 5, -5, 3, 3, 0, -4, -5],
	target = -2
console.log(threeSumClosest(nums, target))
