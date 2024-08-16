const { Mitt } = require('./mitt.js')
const mitt = new Mitt()
const handler1 = () => {
	console.log('handler1')
}
const handler2 = () => {
	console.log('handler1')
}
const obj = {
	age: 23,
	name: 'lisa',
}
mitt.emit('desc', 'lisa', 23)
mitt.on(
	'desc',
	function () {
		console.log('desc', this)
	}.bind(obj)
)
mitt.on('desc', () => {
	console.log('desc111111111')
})
mitt.on('desc', (...args) => {
	console.log('args', args)
})
mitt.on('test', (...args) => {
	console.log('args', args)
})

mitt.off(
	'desc',
	function () {
		console.log('desc', this)
	}.bind(obj)
)
mitt.on('first', handler1)
mitt.on('first', handler2)
mitt.on('*', (event, ...args) => {
	console.log('all', event, args)
})
mitt.emit('desc', 'ceshi', 23)
mitt.emit('first', 'ceshi', 23)
mitt.emit('first', 'ceshi', 24)
