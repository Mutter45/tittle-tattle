const { my_call, my_apply, my_bind } = require('./function');
describe('my_call', () => {
	beforeAll(() => {
		Function.prototype.my_call = my_call;
	});
	it('should call the function with the specified context and arguments', () => {
		// 定义一个测试函数
		const testFunc = function () {
			return this === globalThis;
		};

		// 调用my_call方法
		const result = testFunc.my_call(null, 'arg1', 'arg2');

		// 断言结果为true
		expect(result).toEqual(true);
	});
	it('should use the correct context', () => {
		// 定义一个测试函数
		const testFunc = function () {
			return this;
		};
		const contextObj = { prop: 'value' };
		// 调用my_call方法
		const result = testFunc.my_call(contextObj, 'arg1', 'arg2');

		// 断言结果为true
		expect(result).toEqual(contextObj);
	});
	it('should use the correct arguments', () => {
		// 定义一个测试函数
		const testFunc = function () {
			return arguments.length;
		};

		// 调用my_call方法
		const result = testFunc.my_call(globalThis, 'arg1', 'arg2', 'arg3');

		// 断言结果为3
		expect(result).toBe(3);
	});
});
describe('my_apply', () => {
	beforeAll(() => {
		Function.prototype.my_apply = my_apply;
	});
	it('should use the correct context', () => {
		// 定义一个测试函数
		const testFunc = function () {
			return this;
		};
		const contextObj = { prop: 'value' };
		// 调用my_apply方法
		const result = testFunc.my_apply(contextObj, ['arg1', 'arg2']);

		// 断言结果为true
		expect(result).toEqual(contextObj);
	});
	it('should use the correct arguments', () => {
		// 定义一个测试函数
		const testFunc = function () {
			return arguments.length;
		};

		// 调用my_apply方法
		const result = testFunc.my_apply(globalThis, ['arg1', 'arg2', 'arg3']);

		// 断言结果为3
		expect(result).toBe(3);
	});
});
describe('my_bind', () => {
	beforeAll(() => {
		Function.prototype.my_bind = my_bind;
	});
	it('should use the correct context', () => {
		// 定义一个测试函数
		const testFunc = function () {
			return this;
		};
		const contextObj = { prop: 'value' };

		// 调用my_bind方法
		const boundFunc = testFunc.my_bind(contextObj, 'arg1', 'arg2');
		expect(boundFunc()).toEqual(contextObj);
	});
	it('should use the correct arguments', () => {
		// 定义一个测试函数
		const testFunc = function () {
			return arguments.length;
		};

		// 调用my_bind方法
		const boundFunc = testFunc.my_bind(globalThis, 'arg1', 'arg2', 'arg3');
		expect(boundFunc()).toBe(3);
	});
});
