export function fixedCharCodeAt(str, idx) {
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt#using_charcodeat
  idx = idx || 0;
  var code = str.charCodeAt(idx);
  var hi, low;

  if (0xD800 <= code && code <= 0xDBFF) {
    hi = code;
    low = str.charCodeAt(idx + 1);
    if (isNaN(low)) {
      throw 'High surrogate not followed by ' +
        'low surrogate in fixedCharCodeAt()';
    }
    return (
      (hi - 0xD800) * 0x400) +
      (low - 0xDC00) + 0x10000;
  }
  if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
    return false;
  }
  return code;
}

export function charCode2Unicode(charCode){
  return "U+"+charCode.toString(16).toUpperCase()
}

export function char2Unicode(char){
  return charCode2Unicode(fixedCharCodeAt(char,0))
}

export function getUnicodeBlock(char){
  // const blocks = [
  //   {"name": "CJK Unified Ideographs", "start": "U+4E00", "end":"U+9FFC"},
  //   {"name": "CJK Unified Ideographs Extension A", "start": "U+3400", "end":"U+4DBF"},
  //   {"name": "CJK Unified Ideographs Extension B", "start": "U+20000", "end":"U+2A6DD"},
  //   {"name": "CJK Unified Ideographs Extension C", "start": "U+2A700", "end":"U+2B734"},
  //   {"name": "CJK Unified Ideographs Extension D", "start": "U+2B740", "end":"U+2B81D"},
  //   {"name": "CJK Unified Ideographs Extension E", "start": "U+2B820", "end":"U+2CEA1"},
  //   {"name": "CJK Unified Ideographs Extension F", "start": "U+2CEB0", "end":"U+2EBE0"},
  //   {"name": "CJK Unified Ideographs Extension G", "start": "U+30000", "end":"U+3134A"},    
  // ]
  const blocks = [
    {"name": "統合漢字", "start": "U+4E00", "end":"U+9FFC"},
    {"name": "拡張漢字A", "start": "U+3400", "end":"U+4DBF"},
    {"name": "拡張漢字B", "start": "U+20000", "end":"U+2A6DD"},
    {"name": "拡張漢字C", "start": "U+2A700", "end":"U+2B734"},
    {"name": "拡張漢字D", "start": "U+2B740", "end":"U+2B81D"},
    {"name": "拡張漢字E", "start": "U+2B820", "end":"U+2CEA1"},
    {"name": "拡張漢字F", "start": "U+2CEB0", "end":"U+2EBE0"},
    {"name": "拡張漢字G", "start": "U+30000", "end":"U+3134A"},    
  ]
  const charPoint = fixedCharCodeAt(char)
  // console.log(charPoint)
  for (let block of blocks){
    const start = parseInt(Number("0x"+block.start.substring(2)),10)
    const end =parseInt(Number("0x"+block.end.substring(2)),10)
    if (charPoint>= start && charPoint<= end){
      return block.name
    }
  }
  return "Unknown"
}


export function getGwPngUrl(char) {
  const code = "u" + char2Unicode(char).substring(2).toLowerCase();
  const url = "https://glyphwiki.org/glyph/" + code + ".png";
  return url;
}
export function getGwSvgUrl(char) {
  const code = "u" + char2Unicode(char).substring(2).toLowerCase();
  const url = "https://glyphwiki.org/glyph/" + code + ".svg";
  return url;
}

export function convertCodePoints(str) {
  return Array.from(str).map((char) => {
    return char.codePointAt(0).toString(16);
  });
}