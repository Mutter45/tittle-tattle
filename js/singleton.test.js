const assert = require('assert')
const singleton = require('./singleton')

describe('singleton', () => {
	it('should return a singleton instance', () => {
		const MyClass = function () {
			this.property1 = 'value1'
			this.property2 = 'value2'
		}

		const singletonInstance = singleton(MyClass)
		const instance1 = new singletonInstance()
		const instance2 = new singletonInstance()

		assert.deepStrictEqual(instance1, instance2)
	})

	it('should throw a warning if class is constructed with different arguments', () => {
		const MyClass = function (a, b) {
			this.property1 = [a, b]
		}

		const warnSpy = jest.spyOn(console, 'warn')

		const singletonInstance = singleton(MyClass)
		const instance1 = new singletonInstance(1, 2)
		const instance2 = new singletonInstance(3, 4)

		expect(warnSpy).toHaveBeenCalledWith('singleton class can only be constructed once')
		expect(instance1).toEqual(instance2)

		warnSpy.mockRestore()
	})

	it('should create a new instance if class is constructed with the same arguments', () => {
		const MyClass = function (a, b) {
			this.property1 = [a, b]
		}

		const warnSpy = jest.spyOn(console, 'warn')

		const singletonInstance = singleton(MyClass)
		const instance1 = new singletonInstance(1, 2)
		const instance2 = new singletonInstance(1, 2)

		expect(warnSpy).not.toHaveBeenCalled()
		expect(instance1).toEqual(instance2)

		warnSpy.mockRestore()
	})
})
