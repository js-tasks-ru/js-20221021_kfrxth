export function trimSymbols(string, size) {
  let countSameWord = 0;
  let result = "";

  if (string.length === 0 || size === 0) {
    return result;
  }

  if (typeof size === "undefined") {
    return string;
  }

  for (let [index, word] of Object.entries(string)) {
	if (countSameWord < size){
		result += word;
		countSameWord++;
	}

	if (string[+index + 1] !== word){
		countSameWord = 0;
	}
  }

  return result;
}
