import createCSS from "../src/createCSS.js";

let css =createCSS({
  '.card': {
    padding: '1rem',
    '@media (min-width: 768px)': {
      padding: '2rem',
      '&:hover': {
        transform: 'scale(1.05)',
        '@media (prefers-reduced-motion: no-preference)': {
          transition: 'transform 0.2s ease'
        }
      }
    }
  }
});
css = createCSS({
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
})

css = createCSS({
  'div': {
    border: '2px solid gray',
    '@media (min-width: 1024px)': {
      border: '0'
    }
  }
})
console.log(css);