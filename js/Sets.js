/**
 * AbstractSet类只定义了一个抽象方法has()
 */
class AbstractSet {
	/**
	 * 判断是否存在
	 * @param {*} item
	 */
	has(item) {
		throw new Error('Abstract method');
	}
}
class NotSet extends AbstractSet {
	constructor(set) {
		super();
		this.set = set;
	}
	has(item) {
		return !this.set.has(item);
	}
	toString() {
		return `{x | x ∉ ${this.set.toString()} }`;
	}
}
class RangeSet extends AbstractSet {
	constructor(min, max) {
		super();
		this.min = min;
		this.max = max;
	}
	has(item) {
		return item >= this.min && item <= this.max;
	}
	toString() {
		return `{x | ${this.min} ≤ x ≤ ${this.max}}`;
	}
}
const set = new RangeSet(1, 5);
console.log(set.has(3));
console.log(set.toString());
