import createCSS from "../src/createCSS.js";

let input = createCSS({
  'body': {
    'color': 'red'
  }
});
let output = `body{
  color: red;
}`
if(input === output) {
  console.info('PASS')
} 
else {
  console.error('FAIL');
}
