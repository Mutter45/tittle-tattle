function singleton(className) {
	let ins;
	let oldargs = [];
	return new Proxy(className, {
		construct(target, args) {
			if (oldargs.length > 0) {
				if (JSON.stringify(oldargs) !== JSON.stringify(args)) {
					console.warn('singleton class can only be constructed once');
					return ins;
				}
			} else {
				oldargs = args;
			}
			if (!ins) {
				ins = Reflect.construct(target, args);
			}
			return ins;
		},
	});
}
module.exports = singleton;
