const handlers = new Map();
class Mitt {
	//监听
	on(event, handler) {
		if (handlers.get(event)) {
			handlers.set(event, [...handlers.get(event), handler]);
		} else {
			handlers.set(event, [handler]);
		}
	}
	// 触发时监听需要先注册，不然就无法触发
	emit(event, ...args) {
		// 处理 all监听事件
		// console.log(handlers.get('*'), [...handlers.values()], '*****************');
		const bindHandler = handlers.get(event);
		if (bindHandler) {
			bindHandler.forEach((handler) => {
				handler(...args);
			});
		}
		// 处理 all监听事件
		const allHandler = handlers.get('*');
		if (allHandler) {
			allHandler.forEach((handler) => {
				handler(event, ...args);
			});
		}
	}
	off(event, handler) {
		handlers.delete(event);
		handler();
	}
	// 清除所有监听
	static clear() {
		handlers.clear();
	}
}
module.exports = { Mitt, handlers };
