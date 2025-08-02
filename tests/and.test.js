import createCSS from "../src/createCSS.js";

let css = createCSS({
  '.nav': {
    border: '2px solid red',
    '&:hover .item': {
      color: 'red'
    },
    '&.active': {
      fontWeight: 'bold'
    }
  }
});

console.log(css);
