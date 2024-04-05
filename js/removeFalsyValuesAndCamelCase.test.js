const removeFalsyValuesAndCamelCase = require('./removeFalsyValuesAndCamelCase');
describe('removeFalsyValuesAndCamelCase', () => {
	it('Common type should return self', () => {
		const str = '1';
		const str1 = null;
		const str2 = false;
		const str3 = undefined;
		expect(removeFalsyValuesAndCamelCase(str)).toEqual(str);
		expect(removeFalsyValuesAndCamelCase(str1)).toEqual(null);
		expect(removeFalsyValuesAndCamelCase(str2)).toEqual(false);
		expect(removeFalsyValuesAndCamelCase(str3)).toEqual(undefined);
	});
	it('should delete all false value', () => {
		const obj = {
			name: 'John',
			isMan: false,
			age: '',
			a: undefined,
			b: null,
		};
		expect(removeFalsyValuesAndCamelCase(obj)).toEqual({
			name: 'John',
		});
	});
	it('array is should delete false value', () => {
		const arr = [0, false, null, 1, 'a', undefined, , '', 2];
		expect(removeFalsyValuesAndCamelCase(arr)).toEqual([1, 'a', 2]);
	});
	it('Nested objects, false values for all objects or arrays should be removed ', () => {
		const deepObj = {
			name: 'John',
			isMan: false,
			age: '',
			a: undefined,
			b: null,
			sex: 'man',
			c: '1',
			arr: [0, false, null, 1, 'a', undefined, , '', 2, { d: 1, f: undefined }],
		};
		expect(removeFalsyValuesAndCamelCase(deepObj)).toEqual({ name: 'John', sex: 'man', c: '1', arr: [1, 'a', 2, { d: 1 }] });
	});
});
