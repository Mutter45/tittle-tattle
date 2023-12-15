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
class AbstractEnumerableSet extends AbstractSet {
	get size() {
		throw new Error('Abstract method');
	}
	[Symbol.iterator]() {
		throw new Error('Abstract method');
	}
	isEmpty() {
		return this.size === 0;
	}
	toString() {
		return `{${Array.from(this).splice('|')}}`;
	}
	equals(set) {
		// 如果另一个集合不是AbstractEnumerableSet，那肯定不等于当前集合
		if (!(set instanceof AbstractEnumerableSet)) return false;
		// 如果两个集合的大小不相等，那肯定不相等
		if (this.size !== set.size) return false;
		for (let item of this) {
			// 存在元素不在set集合中，就不相等
			if (!set.has(item)) return false;
		}
		return true;
	}
}
/**
 * SingletonSet是AbstractEnumerableSet的一个具体子类
 */
class SingletonSet extends AbstractEnumerableSet {
	constructor(member) {
		super();
		this.member = member;
	}
	get size() {
		return 1;
	}
	has(item) {
		return item === this.member;
	}
	*[Symbol.iterator]() {
		yield this.member;
	}
}
/**
 * AbstractWritableSet是AbstractEnumerableSet的一个抽象子类
 * 这个抽象类定义了insert()和remove()，分别用于对集合的插入、删除操作
 * 具体实现了add(), subtract()和intersect()方法,开始偏离了标准的javascript Set类
 */
class AbstractWritableSet extends AbstractEnumerableSet {
	insert(item) {
		throw new Error('Abstract method');
	}
	remove(item) {
		throw new Error('Abstract method');
	}
	add(set) {
		for (let item of set) {
			this.insert(item);
		}
	}
	subtract(set) {
		for (let item of set) {
			this.remove(item);
		}
	}
	intersect(set) {
		for (let item of this) {
			if (!set.has(item)) {
				this.remove(item);
			}
		}
	}
}
/**
 * BitSet是AbstractWritableSet的一个具体子类
 */
class BitSet extends AbstractWritableSet {
	constructor(max) {
		super();
		this.max = max; // 可存储的最大整数
		this.n = 0; // 集合中整数的个数
		this.numBytes = Math.floor(max / 8) + 1; // 需要多少字节
		this.data = new Uint8Array(this.numBytes); //实际的字节
	}
	// 内部方法，检测一个值是否为当前成员的合法成员
	_valid(x) {
		return Number.isInteger(x) && x >= 0 && x <= this.max;
	}
	// 测试数据数组中指定字节的指定位是否有值
	_has(byte, bit) {
		console.log(this.data, BitSet.bits, '============', this.numBytes, 'sss', this.data[byte] & BitSet.bits[bit]);
		return (this.data[byte] & BitSet.bits[bit]) !== 0;
	}
	// 验证 x 在 BitSet 中
	has(x) {
		if (this._valid(x)) {
			const byte = Math.floor(x / 8);
			const bit = x % 8;
			// console.log(byte, bit, '--------------');
			return this._has(byte, bit);
		} else {
			return false;
		}
	}
	// 插入x BitSet 中
	insert(x) {
		if (this._valid(x)) {
			const byte = Math.floor(x / 8);
			const bit = x % 8;
			if (!this._has(byte, bit)) {
				this.data[byte] |= BitSet.bits[bit]; //设置该位的值
				this.n++;
			}
		} else {
			throw new Error('Invalid set element: ' + x);
		}
	}
	remove(x) {
		if (this._valid(x)) {
			const byte = Math.floor(x / 8);
			const bit = x % 8;
			if (this._has(byte, bit)) {
				this.data[byte] &= BitSet.bits[bit]; //取消该位的值
				this.n--;
			}
		} else {
			throw new Error('Invalid set element: ' + x);
		}
	}
	// 获取方法， 返回集合大小
	get size() {
		return this.n;
	}
	*[Symbol.iterator]() {
		for (let i = 0; i < this.max; i++) {
			if (this.has(i)) {
				yield i;
			}
		}
	}
}
BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);
const set = new RangeSet(1, 5);
console.log(set.has(3));
console.log(set.toString());
const abstractEnumerableSet = new AbstractEnumerableSet();
// console.log(abstractEnumerableSet.equals(abstractEnumerableSet));
const singletonSet = new SingletonSet([1, 2]);
console.log(singletonSet.size);
console.log(singletonSet.has(1));
console.log(singletonSet.toString());
console.log([...singletonSet]);
const bitSet = new BitSet(20);
bitSet.insert(5);
bitSet.insert(2);
bitSet.insert(3);
bitSet.insert(13);
bitSet.insert(18);
console.log(bitSet._valid(5), bitSet.has(2), '-------', BitSet.bits[1], bitSet.size, [...bitSet]);
////////////////////////
