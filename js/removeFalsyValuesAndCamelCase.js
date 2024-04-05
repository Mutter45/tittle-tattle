function removeFalsyValuesAndCamelCase(data) {
	if (!(data instanceof Object)) return data;
	const res = Object.keys(data).reduce(
		(acc, key) => {
			if (data[key]) {
				acc[key] = typeof data[key] === 'object' ? removeFalsyValuesAndCamelCase(data[key]) : data[key];
			}
			return acc;
		},
		data instanceof Array ? [] : {}
	);
	return data instanceof Array ? res.filter(Boolean) : res;
}
module.exports = removeFalsyValuesAndCamelCase;
