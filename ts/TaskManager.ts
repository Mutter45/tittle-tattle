function task(name: string, time: number) {
	console.time('task' + name)
	return (success: () => void, error: () => void): Promise<void> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.timeEnd('task' + name)
				resolve()
				success()
			}, time)
		})
	}
}

class TaskManager {
	private taskList: (() => Promise<void>)[] = []
	private maxTaskNum: number
	private currentTaskNum: number = 0
	constructor(maxTaskNum: number = 2) {
		this.maxTaskNum = maxTaskNum
	}
	run() {
		if (this.currentTaskNum >= this.maxTaskNum || !this.taskList.length) return
		const task = this.taskList.shift()!
		this.currentTaskNum++
		task().finally(() => {
			this.currentTaskNum--
			this.run()
		})
	}
	addTask(task: (...args: any[]) => Promise<void>) {
		return new Promise((...args) => {
			this.taskList.push(() => task(...args))
			this.run()
		})
	}
}
const taskManager = new TaskManager()
taskManager.addTask(task('任务1', 1000)).then(() => {
	console.log('任务1执行完成')
}) // task任务1: 1s
taskManager.addTask(task('任务2', 2000)).then(() => {
	console.log('任务1执行完成')
}) // task任务1: 2s
taskManager.addTask(task('任务3', 3000)) // task任务1: 4s
taskManager.addTask(task('任务4', 4000)) // task任务1: 6s
taskManager.addTask(task('任务5', 5000)) // task任务1: 9s
