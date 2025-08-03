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
})

console.log(css);