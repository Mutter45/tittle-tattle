const singleton = require('./singleton.js');
// Proxy 使用
let validator = {
	get: function (obj, prop) {
		console.log(obj, prop);
		if (prop === 'age') {
			return '90';
		}
	},
	set: function (obj, prop, value) {
		if (prop === 'age') {
			if (!Number.isInteger(value)) {
				throw new TypeError('The age is not an integer');
			}
			if (value > 200) {
				throw new RangeError('The age seems invalid');
			}
		}

		// The default behavior to store the value
		obj[prop] = value;

		// 表示成功
		return true;
	},
};

let person = new Proxy({}, validator);

person.age = 100;

class Test {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	say() {
		console.log('say hello');
	}
}

// 单例模式
const SingletonTest = singleton(Test);
const test = new SingletonTest('zhnasan', 23);
const test1 = new SingletonTest('lisa', 34);
console.log(test, test1, test === test1);
