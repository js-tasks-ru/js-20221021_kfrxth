export function createGetter(path) {
  let masPath = path.split(".");

  return (obj) => {
    let result = obj;

    if (result === undefined) {
      return result;
    }

    for (let i = 0; i < masPath.length; i++) {
      result = result[masPath[i]];
    }

    return result;
  };
}