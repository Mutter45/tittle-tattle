const singleton = require('./singleton.js')
class Mitt {
	// 定义为私有字段 防止通过实例进行更改
	#handlers = new Map()
	static instance
	constructor() {
		if (!Mitt.instance) {
			Mitt.instance = this
		}
		return Mitt.instance
	}
	//通过handlers获取收集的所有依赖
	get handlers() {
		// 将map结构转为普通对象
		return Object.fromEntries(this.#handlers)
	}
	/**
	 *
	 * @param { String } event 订阅事件名称
	 * @param { Function} handler 订阅事件处理函数
	 */
	on(event, handler) {
		if (this.#handlers.get(event)) {
			this.#handlers.set(event, [...this.#handlers.get(event), handler])
		} else {
			this.#handlers.set(event, [handler])
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
		const bindHandler = this.#handlers.get(event)
		if (bindHandler) {
			bindHandler.forEach((handler) => {
				handler(...args)
			})
		}
		// 处理 all监听事件
		const allHandler = this.#handlers.get('*')
		if (allHandler) {
			allHandler.forEach((handler) => {
				handler(event, ...args)
			})
		}
	}
	/**
	 *
	 * @param { String } event 取消订阅事件名称
	 * @param { Function} handler 取消订阅事件处理函数
	 */
	off(event, handler) {
		this.#handlers.delete(event)
		handler()
	}
	// 清除所有监听
	clear() {
		this.#handlers.clear()
	}
}
module.exports = Mitt
