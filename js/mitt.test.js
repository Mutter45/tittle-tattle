const Mitt = require('./mitt.js');
describe('Mitt', () => {
	let mitt;

	beforeAll(() => {
		mitt = new Mitt();
	});
	afterEach(() => {
		mitt.clear();
	});
	describe('get handlers', () => {
		it('get all handlers', () => {
			const handler = jest.fn();
			const handler1 = jest.fn();
			mitt.on('event', handler);
			mitt.on('event1', handler1);
			expect(mitt.handlers).toEqual({ event: [handler], event1: [handler1] });
		});
	});

	describe('on', () => {
		it('should add the handler to the handlers object', () => {
			const handler = jest.fn();
			mitt.on('event', handler);

			expect(mitt.handlers['event']).toEqual([handler]);
		});

		it('should add the handler to the handlers object if event already exists', () => {
			const handler1 = jest.fn();
			const handler2 = jest.fn();
			mitt.on('event1', handler1);
			mitt.on('event1', handler2);
			expect(mitt.handlers['event1']).toEqual([handler1, handler2]);
		});
	});

	describe('emit', () => {
		it('should execute all handlers for the given event', () => {
			const handler1 = jest.fn();
			const handler2 = jest.fn();
			mitt.on('event', handler1);
			mitt.on('event', handler2);

			mitt.emit('event');

			expect(handler1).toBeCalledTimes(1);
			expect(handler2).toBeCalledTimes(1);
		});

		it('should execute all handlers if event is a wildcard', () => {
			const handler1 = jest.fn();
			mitt.on('*', handler1); // 监听所有触发事件
			mitt.emit('event1');
			mitt.emit('event2');
			mitt.emit('event3');
			expect(handler1).toBeCalledTimes(3);
		});

		it('should not execute any handlers if event does not exist', () => {
			const handler = jest.fn();
			mitt.emit('event');

			expect(handler).toBeCalledTimes(0);
		});
	});

	describe('off', () => {
		it('should remove the handler from the handlers object', () => {
			const handler = jest.fn();
			mitt.on('event', handler);
			mitt.off('event', handler);

			expect(mitt.handlers['event']).toBeUndefined();
		});

		it('should call the handler', () => {
			const handler = jest.fn();
			const handler1 = jest.fn();
			mitt.on('event', handler1);
			mitt.off('event', handler);
			mitt.emit('event');

			expect(handler).toBeCalledTimes(1);
			expect(handler1).toBeCalledTimes(0);
		});
	});

	describe('static clear', () => {
		it('should clear all handlers', () => {
			const handler1 = jest.fn();
			const handler2 = jest.fn();
			mitt.on('event1', handler1);
			mitt.on('event2', handler2);
			mitt.clear();

			expect(mitt.handlers).toEqual({});
		});
	});
});
