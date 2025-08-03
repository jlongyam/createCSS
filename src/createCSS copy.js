function createCSS(rules) {
  const output = [];
  const regularRules = {};
  const atRules = {};

  // Process regular CSS rules (non @-rules)
  function processRegularRule(selector, styles, parent = '') {
    const resolvedSelector = selector.includes('&')
      ? selector.replace(/&/g, parent)
      : parent ? `${parent} ${selector}` : selector;

    if (!regularRules[resolvedSelector]) {
      regularRules[resolvedSelector] = [];
    }

    for (const [key, value] of Object.entries(styles)) {
      if (typeof value === 'object' && value !== null) {
        processRegularRule(key, value, resolvedSelector);
      } else {
        const prop = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        regularRules[resolvedSelector].push(`${prop}: ${value};`);
      }
    }
  }

  // Special processor for @-rules
  function processAtRule(atRule, styles) {
    if (!atRules[atRule]) {
      atRules[atRule] = {};
    }

    for (const [selector, ruleStyles] of Object.entries(styles)) {
      if (selector.startsWith('@')) {
        // Nested at-rule
        processAtRule(selector, ruleStyles);
      } else {
        // Regular selector inside at-rule
        const resolvedSelector = selector.includes('&')
          ? selector.replace(/&/g, '')
          : selector;

        if (!atRules[atRule][resolvedSelector]) {
          atRules[atRule][resolvedSelector] = [];
        }

        for (const [prop, value] of Object.entries(ruleStyles)) {
          if (typeof value === 'object' && value !== null) {
            // Handle nested styles for this selector
            const nestedSelector = prop.includes('&')
              ? prop.replace(/&/g, resolvedSelector)
              : `${resolvedSelector} ${prop}`;
            
            if (!atRules[atRule][nestedSelector]) {
              atRules[atRule][nestedSelector] = [];
            }
            
            for (const [nestedProp, nestedValue] of Object.entries(value)) {
              const cssProp = nestedProp.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
              atRules[atRule][nestedSelector].push(`${cssProp}: ${nestedValue};`);
            }
          } else {
            const cssProp = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            atRules[atRule][resolvedSelector].push(`${cssProp}: ${value};`);
          }
        }
      }
    }
  }

  // Process all rules
  for (const [selector, styles] of Object.entries(rules)) {
    if (selector.startsWith('@')) {
      processAtRule(selector, styles);
    } else {
      processRegularRule(selector, styles);
    }
  }

  // Output regular rules
  const sortedRegular = Object.keys(regularRules).sort();
  for (const selector of sortedRegular) {
    const lines = regularRules[selector];
    if (lines.length === 0) continue;
    output.push(`${selector} {`);
    output.push(...lines.map(line => `  ${line}`));
    output.push('}');
  }

  // Output at-rules
  const sortedAtRules = Object.keys(atRules).sort();
  for (const atRule of sortedAtRules) {
    const selectors = atRules[atRule];
    const hasContent = Object.values(selectors).some(lines => lines.length > 0);
    if (!hasContent) continue;

    output.push(`${atRule} {`);

    // Output nested selectors
    const sortedSelectors = Object.keys(selectors).sort();
    for (const selector of sortedSelectors) {
      const lines = selectors[selector];
      if (lines.length === 0) continue;
      output.push(`  ${selector} {`);
      output.push(...lines.map(line => `    ${line}`));
      output.push('  }');
    }

    output.push('}');
  }

  return output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export default createCSS;