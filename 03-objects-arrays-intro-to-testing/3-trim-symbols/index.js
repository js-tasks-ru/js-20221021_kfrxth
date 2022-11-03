export function trimSymbols(string, size) {
  let countSameWord = 0;
  let result = "";
  let splitString = [...string];

  if (string.length === 0 || size === 0) {
    return result;
  }

  if (typeof size === "undefined") {
    return string;
  }

  for (const [index, word] of Object.entries(splitString)) {
	if (countSameWord < size){
		result += word;
		countSameWord++;
	}

	if (splitString[Number(index) + 1] !== word){
		countSameWord = 0;
	}
  }

  return result;
}
