export class Node {
	data
	next = null
	constructor(data: any) {
		this.data = data
	}
}
export class LinkedList {
	// 初始链表长度为 0
	length: number = 0

	// 初始 head 为 null，head 指向链表的第一个节点
	head: any = null

	// 内部类（链表里的节点 Node）

	append(data: any) {
		const newNode = new Node(data)
		if (this.head === null) {
			this.head = newNode
		} else {
			// 链表长度大于 0 时，在最后面添加新节点
			let current = this.head
			// 当 current.next 不为空时，
			// 循序依次找最后一个节点，即节点的 next 为 null 时
			while (current.next) {
				current = current.next
			}
			// 最后一个节点的 next 指向新节点
			current.next = newNode
		}
		this.length++
	}
	insert(position: number, data: any) {
		/** 对 position 进行越界判断，不能小于 0 或大于链表长度 */
		if (position < 0 || position > this.length) return false
		const newNode = new Node(data)
		if (position === 0) {
			newNode.next = this.head
			this.head = newNode
		} else {
			let index = 0
			let current = this.head
			let previous = null
			// 在 0 ~ position 之间遍历，不断地更新 currentNode 和 previousNode
			// 直到找到要插入的位置
			while (index++ < position) {
				previous = current
				current = current.next
			}
			// 在当前节点和当前节点的上一节点之间插入新节点，即它们的改变指向
			previous.next = newNode
			newNode.next = current
		}
		// 更新链表长度
		this.length++
		return newNode
	}
	getData(position: number) {
		/** position 越界判断 */
		if (position < 0 || position >= this.length) return null
		let index = 0
		let current = this.head
		// 获取指定 position 节点的 data
		while (index++ < position) {
			current = current.next
		}
		return current.data
	}
	indexOf(data: any) {
		let currentNode = this.head
		let index = 0
		// 遍历所有的节点，直到节点为data, 获取节点的 index 找不到返回 -1
		while (currentNode) {
			if (currentNode.data === data) {
				return index
			}
			currentNode = currentNode.next
			index++
		}
		return -1
	}
	update(position: number, newData: any) {
		if (position < 0 || position >= this.length) return false
		let currentNode = this.head
		let index = 0
		// 遍历所有的节点，直到节点为data, 获取节点的 index 找不到返回 -1
		while (index < position) {
			currentNode = currentNode.next
			index++
		}
		currentNode.data = newData
		return currentNode
	}
	removeAt(position: number) {
		if (position < 0 || position >= this.length) return null
		let currentNode = this.head
		if (position === 0) {
			// position = 0 的情况
			this.head = currentNode.next
		} else {
			let index = 0
			let previousNode = null
			while (index++ < position) {
				previousNode = currentNode
				currentNode = currentNode.next
			}
			previousNode.next = currentNode.next
		}

		this.length--
		return currentNode
	}
	remove(data: any) {
		return this.removeAt(this.indexOf(data))
	}
	isEmpty() {
		return this.length === 0
	}
	size() {
		return this.length
	}
	toString() {
		let currentNode = this.head
		let result = ''

		// 遍历所有的节点，拼接为字符串，直到节点为 null
		while (currentNode) {
			result += currentNode.data + ' '
			currentNode = currentNode.next
		}

		return result
	}
}
const linkedList = new LinkedList()
// 测试 append 方法
linkedList.append('A')
linkedList.append('B')
linkedList.append('C')
// console.log(linkedList.toString()) // A B C
// console.log(linkedList.insert(2, 'D')) // { next: { next: null, data: 'C' }, data: 'D' }
// console.log(linkedList.toString()) // A B D C
// console.log(linkedList.length) // 4
// console.log(linkedList.getData(3)) // C
// console.log(linkedList.indexOf('D')) // 2
// console.log(linkedList.update(2, 'E')) // { next: { next: null, data: 'C' }, data: 'E' }
// console.log(linkedList.toString()) // A B E C
// console.log(linkedList.removeAt(2)) //{ next: { next: null, data: 'C' }, data: 'E' }
// console.log(linkedList.toString()) // A B C
// console.log(linkedList.remove('C')) //{ next: null, data: 'C' }
// console.log(linkedList.toString()) // A B C
// console.log(linkedList.isEmpty()) // false
// console.log(linkedList.size()) // 2
