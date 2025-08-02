// require type, and tester
/**
 * @param {Object} rules of CSS
 * @return {String} CSS text
 * @example
 * 
*/
function createCSS(rules) {
  let css = '';
  /**
   * 
   * @param {Object} objectVal CSS { Property: Value }
   */
  function createProp(objectVal, tab = 2) {
    let str = `{\n`;
    let space = ' '.repeat(tab)
    for( let prop in objectVal ) {
      let val = objectVal[prop];
      str += `${space+String(prop)}: ${String(val)};\n`
    }
    str += `}\n`;
    return str;
  }
  for( let key in rules ) {
    let selector = String(key);
    let val = rules[key];
    css += selector + createProp(val);
  }
  return css.trim();
}
export default createCSS;

