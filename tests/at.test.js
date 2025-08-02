import createCSS from "../src/createCSS.js";

const css = createCSS({
  a: {
    color: 'gray',
    '&:hover': {
      color: 'silver'
    }
  },
  '.btn': {
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkblue'
    },
    '&:active': {
      color: 'lightblue'
    }
  },
  '@media (max-width: 768px)': {
    '.nav': {
      'padding': '5px',
      '&:hover .item': {
        color: 'red'
      }
    },
    '.btn': {
      fontSize: '14px'
    }
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: '0'
    },
    '100%': {
      opacity: '1'
    }
  },
  '@media (min-width: 1024px)': {
    '.nav': {
      '&.active': {
        fontWeight: 'bold'
      }
    }
  }
});

console.log(css);