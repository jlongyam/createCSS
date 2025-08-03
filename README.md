# createCSS

Traditional style __CSS in JS__ ;-)

The aim is to produce __legacy__ css string output.

In short it's __ES5__ friendly.

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

### 2. Nested and

input JS:

```js
createCSS({
  '.nav': {
    border: '2px solid red',
    '&:hover .item': {
      color: 'red'
    },
    '&.active': {
      fontWeight: 'bold'
    },
    '.other &': {
      borderColor: 'blue'
    }
  }
})
```
CSS output:

```css
.nav {
  border: 2px solid red;
}
.nav:hover .item {
  color: red;
}
.nav.active {
  font-weight: bold;
}
.other .nav {
  border-color: blue;
}
```

### 3. Nested at

Input JS:

```js
createCSS({
  'div': {
    border: '2px solid gray',
    '@media (min-width: 1024px)': {
      border: '0'
    }
  }
})
```

CSS output:

```css
div {
  border: 2px solid gray;
}
@media (min-width: 1024px) {
  div {
    border: 0;
  }
}
```

[MIT](LICENSE) License.
