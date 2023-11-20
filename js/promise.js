function delay(time) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Date.now());
		}, time);
	});
}
const time1 = delay(1000);
const time2 = delay(2000);
const old = Date.now();
Promise.all([time2, time1]).then((res) => {
	console.log(res, 'res::::::::');
	console.log(res[0] - old, 'time::::');
});
// 手写Promise.all
Promise.myall = function (list) {
	return new Promise((resolve) => {
		let result = Array(list.length).fill(null);
		let count = 0;
		const listObj = Object.assign({}, list);
		for (const key in listObj) {
			listObj[key]
				.then((res) => {
					result[key] = res;
					if (count === list.length - 1) {
						resolve(result);
					}
					count += 1;
				})
				.catch((err) => console.log(err));
		}
	});
};
// Promise.myall([time2, time1]).then((res) => {
// 	console.log(res, 'res1111111::::::::');
// });
