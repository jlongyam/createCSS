import createCSS from "../src/createCSS.js";

/*
const rules = {
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

const should = `.card {
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
}`
var output = createCSS(rules);

console.clear();
console.log('== output ==')
console.log(output);
console.log('== should ===')
console.log(should);
console.log('== assert ==')
console.assert(output === should);
*/
/*
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

const expectedOutput = `
.card {
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
}
`.trim();

function runTest() {
  console.log('🧪 Testing generatePrettyCSS function...\n');

  const result = createCSS(testInput);

  // Normalize whitespace for comparison
  const normalizedResult = result.replace(/\s+/g, ' ').trim();
  const normalizedExpected = expectedOutput.replace(/\s+/g, ' ').trim();

  const passed = normalizedResult === normalizedExpected;

  console.log('✅ Input:');
  console.log(JSON.stringify(testInput, null, 2));
  console.log('\n✅ Expected Output:');
  console.log(expectedOutput);
  console.log('\n✅ Generated Output:');
  console.log(result);

  console.log('\n' + (passed ? '🎉 PASS' : '❌ FAIL'));
  if (!passed) {
    console.log('\n❌ Mismatch detected! Check your output.');
  } else {
    console.log('\n🎉 All tests passed! Your function is working correctly.');
  }
}

// === Run the test ===
// runTest();
*/


let testRules = {
  "card": {
    "padding": "16px",
    "&:hover": {
      "transform": "scale(1.05)",
      "background": "lightgray"
    },
    "& @media (max-width: 600px) ": {
      "padding": "10px"
    },
    "@keyframes fadeIn": {
      "0 % ": {
        "opacity": "0"
      },
      "100 % ": {
        "opacity": "1"
      }
    }
  }
};
testRules = {
  "card": {
    "padding": "16px",
    "&:hover": {
      "transform": "scale(1.05)",
      "background": "lightgray"
    },
    "& @media (max-width: 600px)": {
      "padding": "10px"
    },
    "@keyframes fadeIn": {
      "0%": {
        "opacity": "0"
      },
      "100%": {
        "opacity": "1"
      }
    }
  }
}
const testResult = createCSS(testRules);
let testShould = `card:hover {
    transform: scale(1.05);
    background: lightgray;
}

@media (max-width: 600px) {
  card {
    padding: 10px;
  }

}

card@keyframes fadeIn {
  0 %  {
      opacity: 0;
  }

  100 %  {
      opacity: 1;
  }


}

card {
  padding: 16px;
}`.trim()

testShould = `.card {
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


console.clear()

console.log(JSON.stringify(testRules,0,2));
console.log('='.repeat(10));
console.log(testShould);
console.log('='.repeat(10));
console.log(testResult);

if (testResult === testShould) {
  console.log('PASS')
} else {
  console.log('FAIL')
}
