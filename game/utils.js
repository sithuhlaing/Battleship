
const convertLetterToNumber = (l) => 
    l.codePointAt(0) - 65;

const intRange = (n) => 
    [...Array(n).keys()];

const range = (size, startAt = 0) => 
    [...Array(size).keys()].map(i => i + startAt);

const characterRange = (startChar, endChar) => 
    String.fromCharCode(
      ...range(endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1, 
              startChar.charCodeAt(0)));

const mapToObj = (map) => {
                    const obj = {}
                    for (let [k,v] of map)
                        obj[k] = v
                    return obj
                }

export {
  convertLetterToNumber,
  intRange,
  range,
  characterRange,
  mapToObj
}