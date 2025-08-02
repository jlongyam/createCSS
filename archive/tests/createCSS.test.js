import createCSS from "../src/createCSS.js";

const testInput = {
  '.card': {
    padding: '16px',
    '&:hover': {
      transform: 'scale(1.05)',
      background: 'lightgray'
    },
    '& @media (max-width: 600px)': {
      padding: '10px'
    },
    '@keyframes fadeIn': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' }
    }
  }
};
var testShould = `.card {
  padding: 16px;
}

.card:hover {
  transform: scale(1.05);
  background: lightgray;
}

@media (max-width: 600px) {
  .card {
    padding: 10px;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}`.trim()

var testOutput = `.card:hover {
}

@media (max-width: 600px) {
  .card {
    padding: 10px;
  }

}

.card@keyframes fadeIn {
  0% {
  }

  100% {
  }

}

.card {
  padding: 16px;
}`.trim()

var testResult = createCSS(testInput);

console.clear()

// console.log(JSON.stringify(testRules,0,2));

console.log('RESULT: ','='.repeat(10));
console.log(testResult);
console.log('SHOULD: ','='.repeat(10));
console.log(testShould);

if (testResult === testOutput) {
  console.log('PASS')
} else {
  console.log('FAIL')
}
