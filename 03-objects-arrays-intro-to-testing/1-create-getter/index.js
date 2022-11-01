export const createGetter = path => {
  const pathArray = path.split('.');

  return obj => {
    let result = obj;

    for (const item of pathArray) {
      if (result === undefined) {
        break;
      }

      result = result[item];
    }

    return result;
  };
};
