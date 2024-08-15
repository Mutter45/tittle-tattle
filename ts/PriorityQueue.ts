import { Queue } from './Queue';
// 优先队列内部的元素类
class QueueElement {
	element: any;
	priority: any;
	constructor(element: any, priority: any) {
		this.element = element;
		this.priority = priority;
	}
}

// 优先队列类（继承 Queue 类）
export class PriorityQueue extends Queue {
	constructor() {
		super();
	}

	// enqueue(element, priority) 入队，将元素按优先级加入到队列中
	// 重写 enqueue()
	enqueue(element: any, priority?: any) {
		if (priority === undefined) {
			super.enqueue(element);
			return
		}
		// 根据传入的元素，创建 QueueElement 对象
		const queueElement = new QueueElement(element, priority);

		// 判断队列是否为空
		if (this.isEmpty()) {
			// 如果为空，不用判断优先级，直接添加
			this.items.push(queueElement);
		} else {
			// 定义一个变量记录是否成功添加了新元素
			let added = false;

			for (let i = 0; i < this.items.length; i++) {
				// 让新插入的元素进行优先级比较，priority 值越小，优先级越大
				if (queueElement.priority < this.items[i].priority) {
					// 在指定的位置插入元素
					this.items.splice(i, 0, queueElement);
					added = true;
					break;
				}
			}

			// 如果遍历完所有元素，优先级都大于新插入的元素，就将新插入的元素插入到最后
			if (!added) {
				this.items.push(queueElement);
			}
		}
	}
}
const priorityQueue = new PriorityQueue();
// 入队 enqueue() 测试
priorityQueue.enqueue("A", 10);
priorityQueue.enqueue("B", 15);
priorityQueue.enqueue("C", 11);
priorityQueue.enqueue("D", 20);
priorityQueue.enqueue("E", 18);
console.log(priorityQueue.items);
