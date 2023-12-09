/**
 * @abstract call方法
 * @param {*} ctx
 * @param  {...any} args
 * @returns {*} 方法执行结果
 */
Function.prototype.my_call = function (ctx, ...args) {
	const context = ctx === null || undefined ? globalThis : Object(ctx);
	const key = Symbol('fn'); //确保key的唯一性，防止和context中属性名冲突
	// 参考文档(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
	// 使用描述符确保key不可枚举
	Object.defineProperty(context, key, {
		value: this,
	});
	// call为立即执行原函数并返回执行结果
	const result = context[key](...args);
	return result;
};
/**
 * @abstract apply
 * @param {*} ctx
 * @param  { Array } args
 * @returns {*} 方法执行结果
 */
Function.prototype.my_apply = function (ctx, args = []) {
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
	// bind函数为返回一个更改执行上下文的新函数
	return (...restArgs) => this.my_apply(ctx, [...args, ...restArgs]);
};
