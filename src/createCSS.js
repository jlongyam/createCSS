function createCSS(rules) {
  const output = [];

  // Store CSS blocks: { selector: [lines] } or { '@media (cond)': [nested blocks] }
  const cssBlocks = new Map(); // Top-level: selector → lines
  const atRules = new Map();   // @media, @keyframes → nested rules

  function generateCSS(selector, styles, parentSelector = '') {
    // Resolve & → parentSelector
    let fullSelector = selector;
    if (fullSelector.includes('&')) {
      fullSelector = fullSelector.replace(/&/g, parentSelector || '');
    } else {
      fullSelector = parentSelector ? `${parentSelector} ${fullSelector}` : fullSelector;
    }

    fullSelector = fullSelector.trim();

    // Check if this is an at-rule (starts with @)
    if (fullSelector.startsWith('@')) {
      if (!atRules.has(fullSelector)) {
        atRules.set(fullSelector, new Map());
      }
      const ruleMap = atRules.get(fullSelector);

      // Process nested rules inside @media, @keyframes, etc.
      Object.entries(styles).forEach(([nestedSelector, nestedStyles]) => {
        if (nestedSelector.startsWith('@')) {
          // Handle nested at-rules (e.g., @media nested inside @media)
          const nestedRule = nestedSelector;
          const nestedValue = nestedStyles;
          if (typeof nestedValue === 'object' && nestedValue !== null) {
            const nestedMap = new Map();
            nestedMap.set(nestedRule, nestedValue);
            // Recurse into nested at-rules
            processAtRule(nestedRule, nestedValue);
          }
        } else {
          // Regular nested rule inside @media
          const nestedFull = nestedSelector;
          const nestedStylesObj = nestedStyles;

          // Recursively generate CSS for nested selector
          const nestedMap = new Map();
          nestedMap.set(nestedFull, nestedStylesObj);
          processAtRule(fullSelector, nestedMap);
        }
      });
      return;
    }

    // Regular selector (not an at-rule)
    if (!cssBlocks.has(fullSelector)) {
      cssBlocks.set(fullSelector, []);
    }

    const block = cssBlocks.get(fullSelector);

    Object.entries(styles).forEach(([prop, value]) => {
      if (typeof value === 'object' && value !== null) {
        const nestedKey = Object.keys(value)[0];

        if (nestedKey.startsWith('&')) {
          const nestedSelector = nestedKey.replace('&', fullSelector);
          generateCSS(nestedSelector, value, parentSelector);
        } else {
          const nestedSelector = prop;
          const nestedStyles = value;
          generateCSS(nestedSelector, nestedStyles, fullSelector);
        }
      } else {
        const camelToKebab = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        block.push(`  ${camelToKebab}: ${value};`);
      }
    });
  }

  // Helper to process nested rules inside at-rules
  function processAtRule(ruleName, ruleContent) {
    const nestedMap = new Map();
    Object.entries(ruleContent).forEach(([key, value]) => {
      if (key.startsWith('@')) {
        // Nested at-rule
        nestedMap.set(key, value);
      } else {
        // Regular selector
        nestedMap.set(key, value);
      }
    });

    const ruleMap = atRules.get(ruleName) || new Map();
    nestedMap.forEach((val, key) => {
      if (key.startsWith('@')) {
        // Nested at-rule: process recursively
        if (typeof val === 'object' && val !== null) {
          processAtRule(key, val);
        }
      } else {
        // Regular selector inside at-rule
        if (!ruleMap.has(key)) {
          ruleMap.set(key, []);
        }
        const block = ruleMap.get(key);
        Object.entries(val).forEach(([prop, value]) => {
          if (typeof value === 'object' && value !== null) {
            const nestedKey = Object.keys(value)[0];
            if (nestedKey.startsWith('&')) {
              const nestedSelector = nestedKey.replace('&', key);
              generateCSS(nestedSelector, value, key);
            } else {
              const nestedSelector = prop;
              const nestedStyles = value;
              generateCSS(nestedSelector, nestedStyles, key);
            }
          } else {
            const camelToKebab = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            block.push(`  ${camelToKebab}: ${value};`);
          }
        });
      }
    });
    atRules.set(ruleName, ruleMap);
  }

  // Process all top-level rules
  Object.entries(rules).forEach(([selector, styles]) => {
    if (selector.startsWith('@')) {
      // Handle top-level @media, @keyframes
      if (typeof styles === 'object' && styles !== null) {
        atRules.set(selector, new Map());
        processAtRule(selector, styles);
      }
    } else {
      generateCSS(selector, styles);
    }
  });

  // === Generate Final Output ===

  // 1. Sort and output regular selectors (alphabetically)
  const sortedSelectors = Array.from(cssBlocks.keys()).sort();

  sortedSelectors.forEach(selector => {
    const lines = cssBlocks.get(selector);
    if (lines.length === 0) return;
    output.push(`${selector} {`);
    output.push(...lines);
    output.push(`}`);
  });

  // 2. Output @media, @keyframes, etc. (sorted by name)
  const sortedAtRules = Array.from(atRules.keys()).sort();

  sortedAtRules.forEach(ruleName => {
    const ruleMap = atRules.get(ruleName);
    const nestedSelectors = Array.from(ruleMap.keys()).sort();

    output.push(`${ruleName} {`);

    nestedSelectors.forEach(selector => {
      const lines = ruleMap.get(selector);
      if (lines.length === 0) return;
      output.push(`  ${selector} {`);
      output.push(...lines);
      output.push(`  }`);
    });

    output.push(`}`);
  });

  // Join all lines, remove extra blank lines
  return output.join('\n').replace(/\n\s*\n/g, '\n').trim();
}

export default createCSS;

