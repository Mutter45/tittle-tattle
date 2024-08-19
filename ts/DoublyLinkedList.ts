import { LinkedList, Node } from './LinkedList'
class DoublyNode extends Node {
	prev = null
	constructor(data: any) {
		super(data)
	}
}
// 双向链表类继承单向链表类
class DoublyLinkedList extends LinkedList {
	tail: any = null // 尾节点
	// 内部类（链表里的节点 Node）

	constructor() {
		super()
		this.tail = null
	}
	append(data: any) {
		const newNode = new DoublyNode(data)
		if (this.head === null) {
			this.head = newNode
		} else {
			// 跟单向链表不同，不用通过循环找到最后一个节点
			this.tail.next = newNode
			newNode.prev = this.tail
		}
		this.tail = newNode
		this.length++
	}
	insert(position: number, data: any) {
		/** 对 position 进行越界判断，不能小于 0 或大于链表长度 */
		if (position < 0 || position > this.length) return false
		const newNode = new DoublyNode(data)
		if (position === 0) {
			newNode.next = this.head
			this.head = newNode
		} else if (position === this.length) {
			// 在最后一个位置插入
			this.tail.next = newNode
			newNode.prev = this.tail
			this.tail = newNode
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
			newNode.prev = previous
			newNode.next = current
			current.prev = newNode
		}
		// 更新链表长度
		this.length++
		return newNode
	}
	/** 可以肯单向链表的update公用，此方法为另一种实现 */
	update(position: number, newData: any) {
		if (position < 0 || position >= this.length) return false
		// 删除 position 位置的节点
		this.removeAt(position)

		// 在 position 位置插入元素
		return this.insert(position, newData)
	}
	removeAt(position: number) {
		if (position < 0 || position >= this.length) return null
		let currentNode = this.head
		if (position === 0) {
			// position = 0 的情况
			if (this.length === 1) {
				// 链表内只有一个节点的情况
				this.head = null
				this.tail = null
			} else {
				// 链表内有多个节点的情况
				this.head = this.head.next
				this.head.prev = null
			}
		} else if (position === this.length - 1) {
			// position = tail 的情况
			currentNode = this.tail
			this.tail.prev.next = null
			this.tail = currentNode.prev
		} else {
			let index = 0
			let previousNode = null
			while (index++ < position) {
				previousNode = currentNode
				currentNode = currentNode.next
			}
			previousNode.next = currentNode.next
			currentNode.next.prev = previousNode
		}

		this.length--
		return currentNode.data
	}
	forwardToString() {
		return super.toString()
	}
	backwardString() {
		let currentNode = this.tail
		let result = ''
		// 遍历所有的节点，拼接为字符串，直到节点为 null
		while (currentNode) {
			result += currentNode.data + ' '
			currentNode = currentNode.prev
		}
		return result
	}
}
const doublyLinkedList = new DoublyLinkedList()
// 测试 append 方法
doublyLinkedList.append('A')
doublyLinkedList.append('B')
doublyLinkedList.append('C')
console.log(doublyLinkedList.insert(1, 'E')) // C
console.log(doublyLinkedList.toString()) // A E B C
/**
 * ref *2> DoublyNode {
  next: <ref *1> DoublyNode {
    next: DoublyNode { next: null, data: 'C', prev: [Circular *1] },
    data: 'B',
    prev: [Circular *2]
  },
  data: 'D',
  prev: DoublyNode { next: [Circular *2], data: 'A', prev: null }
}
 */
console.log(doublyLinkedList.getData(1)) // E
console.log(doublyLinkedList.indexOf('C')) // 3
console.log(doublyLinkedList.update(1, 'D'))
console.log(doublyLinkedList.toString()) // A D B C
console.log(doublyLinkedList.removeAt(3))
console.log(doublyLinkedList.toString()) // A D B
console.log(doublyLinkedList.forwardToString()) // A D B
console.log(doublyLinkedList.backwardString()) // A D B
