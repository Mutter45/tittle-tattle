function threeSum(nums) {
	nums.sort((a, b) => a - b);
	let result = [];
	for (let i = 0; i < nums.length; i++) {
		if (i > 0 && nums[i] === nums[i - 1]) {
			continue;
		}
		let left = i + 1,
			right = nums.length - 1;
		while (left < right) {
			let sum = nums[i] + nums[left] + nums[right];

			if (sum === 0) {
				result.push([nums[i], nums[left], nums[right]]);
				left++;
				right--;
				while (nums[right] === nums[right + 1]) {
					right--;
				}
				while (nums[left] === nums[left - 1]) {
					left++;
				}
			} else if (sum > 0) {
				right--;
			} else {
				left++;
			}
		}
	}
	return result;
}
const nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));
