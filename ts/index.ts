interface User {
	name: string
	age: number
	sex?: string
	say: Function
}
let num: number = 10
console.log(num)
const user1: User = {
	name: '',
	age: 12,
	say() {
		console.log('say hello')
	},
}
console.log(user1)
let user2 = <User[]>[]
user2 = [
	{
		name: 'lisa',
		age: 12,
		say() {
			console.log('say hello')
		},
	},
]
