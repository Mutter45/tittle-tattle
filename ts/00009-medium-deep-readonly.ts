type X = {
	x: {
		a: 1
		b: 'hi'
	}
	y: 'hey'
	z: [1, 2]
}

// type Expected = {
// 	readonly x: {
// 		readonly a: 1;
// 		readonly b: 'hi';
// 	};
// 	readonly y: 'hey';
// };
type DeepReadonly<T> = keyof T extends never ? T : { readonly [key in keyof T]: DeepReadonly<T[key]> }

let Todo1: DeepReadonly<X> = {
	x: {
		a: 1,
		b: 'hi',
	},
	y: 'hey',
	z: [1, 2],
}
Todo1.x.a = '11'
Todo1.y = 'hi'
Todo1.z[1] = 3
// should be same as `Expected`
