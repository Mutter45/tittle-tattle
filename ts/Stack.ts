// 栈结构的封装
class Stack<T> {
	items: T[]
	constructor() {
		this.items = []
	}

	// push(item) 压栈操作，往栈里面添加元素
	push(item: T) {
		this.items.push(item)
	}

	// pop() 出栈操作，从栈中取出元素，并返回取出的那个元素
	pop() {
		return this.items.pop()
	}

	// peek() 查看栈顶元素
	peek() {
		return this.items[this.items.length - 1]
	}

	// isEmpty() 判断栈是否为空
	isEmpty() {
		return this.items.length === 0
	}

	// size() 获取栈中元素个数
	size() {
		return this.items.length
	}

	// toString() 返回以字符串形式的栈内元素数据
	toString() {
		let result = ''
		for (let item of this.items) {
			result += item + ' '
		}
		return result
	}
}
const stack = new Stack<Number>()
// push() 测试
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack.items) //--> [1, 2, 3]
// pop() 测试
console.log(stack.pop()) //--> 3
// peek() 测试
console.log(stack.peek()) //--> 2
// isEmpty() 测试
console.log(stack.isEmpty()) //--> false
// size() 测试
console.log(stack.size()) //--> 2
// toString() 测试
console.log(stack.toString()) //--> 1 2
