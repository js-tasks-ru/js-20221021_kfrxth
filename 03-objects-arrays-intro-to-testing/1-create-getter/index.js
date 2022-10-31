export function createGetter(path) {
  const masPath = path.split(".");

  return (obj) => {
    let result = obj;

    if (result === undefined) {
      return result;
    }

	for (const item of masPath){
		if (result === undefined){
			break;
		}
		result = result[item];
	}

    return result;
  };
}