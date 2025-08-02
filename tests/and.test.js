import createCSS from "../src/createCSS.js";

let css = createCSS({
  '.nav': {
    border: '2px solid red',
    '&:hover .item': {
      color: 'red'
    },
    '&.active': {
      fontWeight: 'bold'
    },
    '@media (max-width: 768px)': {
      borderColor: 'blue'
    }
  }
});

console.log(css);
