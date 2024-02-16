interface Todo {
	title: string;
	description: string;
	completed: boolean;
}
type MyReadonly2<T, K extends keyof T = keyof T> = {
	[P in Exclude<keyof T, K>]: T[P];
} & {
	readonly [P in K]: T[P];
};
// type MyReadonly2<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
	title: 'Hey',
	description: 'foobar',
	completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
