export function sortStrings(arr, param = "asc") {
   const sortedNewArr = [...arr]
    .sort((a, b) => {
      if (param === "asc") {
        return a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'});
      } else {
        return b.localeCompare(a, ['ru', 'en'],{caseFirst: 'upper'});
      }
    })

  return sortedNewArr;
}
