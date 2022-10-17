 export const pick = (obj, ...fields) => {
	const masArgs = [...fields];
	const mas = Object.entries(obj);
	let filtredMas = mas.filter(item => {
		return masArgs.includes(item[0])
	})

	let resultObj = filtredMas.reduce((result, cur) => {
		let key = cur[0];
		let value = cur[1];
		result[key] = cur[key];
		result[key] = value
		return result;
	}, {})

	return resultObj;
};