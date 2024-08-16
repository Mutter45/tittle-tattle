class LinkedList {
	// 初始链表长度为 0
	length: number = 0

	// 初始 head 为 null，head 指向链表的第一个节点
	head: any = null

	// 内部类（链表里的节点 Node）
	Node = {
		data: null,
		next: null,
	}
}
const linkedList = new LinkedList()
console.log(linkedList)
