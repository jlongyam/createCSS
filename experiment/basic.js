import jss from 'jss';
import preset from 'jss-preset-default';


jss.create(preset);

let style = {
  body: {
    backgroundColor: 'red'
  }
}
// let css = jss.create();
// let sheet = jss.createStyleSheet(style);
// console.log(sheet.toString());
console.log(jss);