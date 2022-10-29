export function invertObj(obj) {
	const result = {};
	if (typeof obj !== 'object'){
		return obj;
	}

	for (const [key, value] of Object.entries(obj)){
		result[value] = key;
	}

	return result;
}