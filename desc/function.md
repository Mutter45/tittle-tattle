# 你是否还在为只能函数时 this 的问题而苦恼？

在 JavaScript 中，[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)是一等公民(first-class)，可以像其他任何数据类型一样被`传递`、`存储`、`修改`和`使用`。

当你调用一个函数时，函数的调用者会成为这个函数的 this 值。

```js
const a = 2;
function foo() {
	console.log(this.a);
}

foo(); // 2
```

在上面的例子中，foo()函数的 this 值是全局对象 window(node 环境下为 undefined 暂不考虑)，因为它是直接调用的。

然而，在 JavaScript 中，函数的 this 值是由函数调用的上下文决定的。除了一般使用默认的执行上下文环境，还可以通过`call()`、`apply()`和`bind()`方法来改变函数的 this 值。

```js
const a = 2;
function foo() {
	console.log(this.a);
}

const bar = foo.bind({ a: 3 });
bar(); // 3
foo.call({ a: 4 }); // 4
foo.apply({ a: 5 }); // 5
```

在上面的例子中，foo 函数的 this 值被绑定到了一个对象上，所以执行上下文的环境就被改变了，打印 a 的值也在不断变化，以上只是一个简单的例子，接下来我们通过手写以上三个方法来深入理解 this 的指向。

## call 方法的作用是改变函数的 this 值，它接收两个参数，第一个参数是函数的 this 值，第二个参数是函数调用时传入的参数。

```js
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
const a = 2;
function foo(...args) {
	console.log(this.a, args);
	const result = args.reduce((pre, cur) => pre + cur);
	console.log(result);
}
foo.my_call({ a: 4 }, '我是', 'my_call');
// 4 [ '我是', 'my_call' ]
// 我是my_call
```

## apply 方法和 call 方法的区别在于，apply 方法接收一个数组作为参数，数组中的元素将作为函数调用的参数。

```js
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
const a = 2;
function foo(...args) {
	console.log(this.a, args);
	const result = args.reduce((pre, cur) => pre + cur);
	console.log(result);
}
foo.my_apply({ a: 5 }, ['我是', 'my_apply']);
// 5 [ '我是', 'my_apply' ]
// 我是my_apply
```

## bind 方法的作用是创建一个新的函数，并将原函数的 this 值绑定到新函数，返回新函数。

```js
/**
 * @abstract bind
 * @param {*} ctx
 * @param  {...any} args
 * @returns { Function } 更换this后的函数
 */
Function.prototype.my_bind = function (ctx, ...args) {
	// bind函数为返回一个更改执行上下文的新函数
	return (...restArgs) => this.my_apply(ctx, [...args, ...restArgs]);
};
// bind返回的为新函数，需要再次调用
foo.my_bind({ a: 6 })('我是', 'my_bind');
// 6 [ '我是', 'my_bind' ]
// 我是my_apply
```

### 欢迎讨论与提出看法!!!!

- [源码地址](https://github.com/Mutter45/tittle-tattle/)
