### 提到mittjs，一定或多或少都在项目中使用过它，无论你是使用Vue,抑或是React，你想实现跨组件通信他都是一个非常好的选择。

### 它有什么特点呢？

- 它是基于发布订阅模式，并且是单向数据流。
- 它可以监听多个事件，并且可以对事件进行过滤。
- 它可以绑定和解绑事件。

### 我们要如何实现呢？ 当然是先明白它的基本原理啦！

### 发布订阅流程大概如下:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7699927755f847e49186b737ff0ab0df~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1149&h=956&s=144323&e=png&b=fefefe)

### 已经明白它的基本原理，那么我们实现它已更近一步了!
1. 首先，我们需要一个储存事件的对象，我们可以使用一个Map来实现，这个Map的键是事件类型，值是事件处理函数的数组。
2. 我们可以用on方法来绑定事件(订阅)，这个方法接收两个参数，第一个参数是事件类型，第二个参数是事件处理函数。
3. 我们可以用emit方法来触发事件(发布)，这个方法接收两个参数，第一个参数是事件类型，第二个参数传递给订阅者的data。
4. 我们可以用off方法来解绑事件，这个方法接收两个参数，第一个参数是事件类型，第二个参数是事件处理函数。

```js
class Mitt {
	handlers = new Map();
	//监听
	/**
	 *
	 * @param { String } event 订阅事件名称
	 * @param { Function} handler 订阅事件处理函数
	 */
	on(event, handler) {}
	/**
	 *
	 * @param { String } event 订阅事件名称
	 * @param { Array } args 传递的参数
	 */
	emit(event, ...args) {}
	/**
	 *
	 * @param { String } event 取消订阅事件名称
	 * @param { Function} handler 取消订阅事件处理函数
	 */
	off(event, handler) {}
}
```

### 我们已经完成它的基本类结构，接下来让我们使用一点小魔法，让它运转起来！

```js
class Mitt {
handlers = new Map();
	/**
	 *
	 * @param { String } event 订阅事件名称
	 * @param { Function} handler 订阅事件处理函数
	 */
	on(event, handler) {
		if (this.handlers.get(event)) {
			this.handlers.set(event, [...this.handlers.get(event), handler]);
		} else {
			this.handlers.set(event, [handler]);
		}
	}
	/**
	 *
	 * @param { String } event 订阅事件名称
	 * @param { Array } args 传递的参数
	 */
	emit(event, ...args) {
		// 处理监听事件
		const bindHandler = this.handlers.get(event);
		if (bindHandler) {
			bindHandler.forEach((handler) => {
				handler(...args);
			});
		}
	}
	/**
	 *
	 * @param { String } event 取消订阅事件名称
	 * @param { Function} handler 取消订阅事件处理函数
	 */
	off(event, handler) {
		this.handlers.clear();
	}
}
```
### 我们已经完成了基本的类结构，接下来我们来实现一个简单的例子，来验证一下我们的类是否正确。

```js
const mitt = new Mitt();
// 绑定事件
mitt.on('event1', (a, b) => {
	console.log(a + b);
});

mitt.on('event1', (a, b) => {
	console.log(a, b);
});

mitt.on('event2', (c) => {
	console.log(c);
});
// 触发事件
mitt.emit('event1', 1, 2);
mitt.emit('event2', 3);
console.log(mitt.handlers);
```
### 输出结果如下：
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/869a56ced8cc4d33bf4b4447fe5a2640~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=946&h=268&s=20774&e=png&b=1f2428)

### 至此我们已经完成了mittjs的基本实现，你可以在单文件中实现事件发布与订阅，并且可以绑定和解绑事件。

### 该实例还有很多优化！
* 我们每次重新 `new Mitt` 实例化一个新的对象，会导致 `handlers` 被清空，所以我们需要在 `mitt` 对象被实例化后，将 `handlers` 保存起来，以便后续使用(可以把 `handlers` 提到 `class`外面保存，亦或者添加单例模式，确保只有一个实例对象) ;

* `handlers` `new Mitt` 实例可以直接访问和修改也会造成不可预知的问题（采用私有字段解决） 

### 生成单例类函数
```js              singleton.js
function singleton(className) {
	let ins;
	let oldargs = [];
	return new Proxy(className, {
		construct(target, args) {
			if (oldargs.length > 0) {
				if (JSON.stringify(oldargs) !== JSON.stringify(args)) {
					console.warn('singleton class can only be constructed once');
					return ins;
				}
			} else {
				oldargs = args;
			}
			if (!ins) {
				ins = Reflect.construct(target, args);
			}
			return ins;
		},
	});
}
````
### 以下为作者的完整实施方案
```js
const singleton = require('./singleton.js'); // 采用代理生成代理
class Mitt {
	// 定义为私有字段 防止通过实例进行更改
	#handlers = new Map();
	//通过handlers获取收集的所有依赖
	get handlers() {
		// 将map结构转为普通对象
		return Object.fromEntries(this.#handlers);
	}
	/**
	 *
	 * @param { String } event 订阅事件名称
	 * @param { Function} handler 订阅事件处理函数
	 */
	on(event, handler) {
		if (this.#handlers.get(event)) {
			this.#handlers.set(event, [...this.#handlers.get(event), handler]);
		} else {
			this.#handlers.set(event, [handler]);
		}
	}
	/**
	 *
	 * @param { String } event 订阅事件名称
	 * @param { Array } args 传递的参数
	 */
	// 触发时监听需要先注册，不然就无法触发
	emit(event, ...args) {
		// 处理监听事件
		const bindHandler = this.#handlers.get(event);
		if (bindHandler) {
			bindHandler.forEach((handler) => {
				handler(...args);
			});
		}
		// 处理 all监听事件
		const allHandler = this.#handlers.get('*');
		if (allHandler) {
			allHandler.forEach((handler) => {
				handler(event, ...args);
			});
		}
	}
	/**
	 *
	 * @param { String } event 取消订阅事件名称
	 * @param { Function} handler 取消订阅事件处理函数
	 */
	off(event, handler) {
		this.#handlers.delete(event);
		handler();
	}
	// 清除所有监听
	clear() {
		this.#handlers.clear();
	}
}
// 采用单例模式生成Mitt实例，确保依赖收集唯一
module.exports = singleton(Mitt);
```
### 欢迎讨论与提出看法!!!!

* [项目参考案例](https://github.com/developit/mitt)
* [源码地址](https://github.com/Mutter45/tittle-tattle/)