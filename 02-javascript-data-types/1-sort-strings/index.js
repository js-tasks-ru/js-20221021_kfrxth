export function sortStrings(arr, param = 'asc') {
	const compareElems = (a, b) => {
		return a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'})
	}

   const sortedNewArr = [...arr]
    .sort((a, b) => {
      if (param === 'asc') {
        return compareElems(a, b);
      }
	 if (param === 'desc') 
	  {
        return compareElems(b, a);
      }
    })

  return sortedNewArr;
}
