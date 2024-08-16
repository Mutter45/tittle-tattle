interface Todo {
	title: string
	description: string
	completed: boolean
}
type MyExclude<T, K> = T extends K ? never : T
// type MyInclude<T, K> = T extends K ? T : never;
type MyOmit<T, K extends keyof T> = {
	[P in MyExclude<keyof T, K>]: T[P]
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo1: TodoPreview = {
	completed: false,
	// description: '',
	// title: '',
}
