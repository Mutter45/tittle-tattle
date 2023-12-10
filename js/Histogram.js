class Histogram {
	// 初始化只涉及创建一个要委托的Map对象
	constructor(iterable) {
		this.map = new Map();
		// 初始化构建
		if (iterable) {
			for (const key of iterable) {
				this.add(key);
			}
		}
	}
	// 对给定的键，次数就是映射中的值
	// 如果映射中不存在这个键，则为0
	#count(key) {
		return this.map.get(key) || 0;
	}
	// 这个类似Set的方法has()在次数大于0时返回true
	has(key) {
		return this.#count(key) > 0;
	}
	// 直方图的大小就是映射中条目的数量
	get size() {
		return this.map.size;
	}
	// 增加一个键，如果映射中已经存在这个键，则增加次数
	// 如果映射中不存在这个键，则创建一个键并增加次数
	// 这个方法类似Set的add()方法
	add(key) {
		this.map.set(key, this.#count(key) + 1);
	}
	// 删除一个键，如果映射中存在这个键，则减少次数
	// 回到0时从映射中删除这个键
	delete(key) {
		let count = this.#count(key);
		if (count > 1) {
			this.map.set(key, count - 1);
		} else {
			this.map.delete(key);
		}
		return count > 0;
	}
	// 迭代直方图返回映射中存储的键
	[Symbol.iterator]() {
		return this.map.keys();
	}
	// 其他迭代器方法直接委托给映射对象
	keys() {
		return this.map.keys();
	}
	values() {
		return this.map.values();
	}
	entries() {
		return this.map.entries();
	}
}
// 测试使用
const histogram = new Histogram(['e', 'f']);
histogram.add('a');
histogram.add('a');
histogram.add('a');
histogram.add('b');
histogram.add('c');
histogram.delete('a');
console.log(histogram, 'size:', histogram.size, 'count', histogram.entries(), 'avalues', histogram.keys());
for (const key of histogram) {
	console.log('histogramkey', key);
}
const setTest = new Set();
setTest.add(function () {
	console.log('setTestkey', 'a');
});
setTest.add('a');
setTest.add('a');
setTest.add('b');
setTest.add('c');
setTest.delete('a');
console.log(setTest, 'size:', setTest.size, 'count', setTest.entries(), 'avalues', setTest.keys());
for (const key of setTest) {
	console.log('setTestkey', key);
}
