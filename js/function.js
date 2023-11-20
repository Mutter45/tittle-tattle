/**
 * @abstract call方法
 * @param {*} ctx
 * @param  {...any} args
 * @returns {*} 方法执行结果
 */
Function.prototype.my_call = function (ctx, ...args) {
	const context = ctx === null || undefined ? globalThis : Object(ctx);
	const key = Symbol('fn');
	Object.defineProperty(context, key, {
		value: this,
	});
	const result = context[key](...args);
	return result;
};
/**
 * @abstract apply
 * @param {*} ctx
 * @param  { Array } args
 * @returns {*} 方法执行结果
 */
Function.prototype.my_apply = function (ctx, args) {
	const context = ctx === null || undefined ? globalThis : Object(ctx);
	const key = Symbol('fn');
	Object.defineProperty(context, key, {
		value: this,
	});
	const result = context[key](...args);
	return result;
};
/**
 * @abstract bind
 * @param {*} ctx
 * @param  {...any} args
 * @returns {*} 更换this后的函数
 */
Function.prototype.my_bind = function (ctx, ...args) {
	return (...restArgs) => this.my_apply(ctx, [...args, ...restArgs]);
};

const obj = {
	name: 'obj',
};
function fn(a, b) {
	console.log(a, b);
	return a + b;
}
console.log(fn.bind(1, 2, 3)(4, 5));
console.log(fn.my_bind(1, 2, 3)(4, 5));
fn.my_bind(1)(1, 2);
