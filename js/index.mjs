import Mitt from './mitt.mjs';
const mitt = new Mitt();
const obj = {
	age: 23,
	name: 'lisa',
};
mitt.emit('desc', 'lisa', 23);
mitt.on(
	'desc',
	function () {
		console.log('desc', this);
	}.bind(obj)
);
mitt.on('desc', () => {
	console.log('desc111111111');
});
mitt.on('desc', (...args) => {
	console.log('args', args);
});
mitt.on('test', (...args) => {
	console.log('args', args);
});

mitt.off(
	'desc',
	function () {
		console.log('desc', this);
	}.bind(obj)
);
mitt.emit('desc', 'ceshi', 23);

mitt.on('first', () => {
	console.log('first');
});
mitt.on('second', () => {
	console.log('second');
});
mitt.emit('first', 'ceshi', 23);
mitt.on('*', () => {});
