# createCSS

Traditional style __CSS in JS__ ;-)

The aim is to produce __legacy__ css string output.

## Usage

### 1. Basic

input JS:

```JS
createCSS({
  body: {
    color: 'red'
  }
})
```
CSS output:

```css
body {
  color: red;
}
```

### 2. Complex

input JS:

```js
createCSS({
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
```
CSS output:

```css
.btn {
  background-color: blue;
  color: white;
}
.btn:active {
  color: lightblue;
}
.btn:hover {
  background-color: darkblue;
}
a {
  color: gray;
}
a:hover {
  color: silver;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@media (max-width: 768px) {
  .btn {
    font-size: 14px;
  }
  .nav {
    padding: 5px;
  }
  .nav:hover .item {
    color: red;
  }
}
@media (min-width: 1024px) {
  .nav.active {
    font-weight: bold;
  }
}
```

## Note

- The out not well structured