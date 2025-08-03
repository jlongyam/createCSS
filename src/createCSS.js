function createCSS(rules) {
  const output = [];

  function processRules(selector, styles, context = { mediaStack: [], indentLevel: 0 }) {
    const { mediaStack, indentLevel } = context;
    const propertyIndent = '  '.repeat(indentLevel + mediaStack.length + 1);
    const selectorIndent = '  '.repeat(indentLevel + mediaStack.length);

    // Separate properties from nested rules
    const properties = [];
    const nestedRules = [];

    for (const [key, value] of Object.entries(styles)) {
      if (key.startsWith('@')) {
        nestedRules.push({ type: 'at-rule', key, value });
      } else if (typeof value === 'object' && value !== null) {
        nestedRules.push({ type: 'selector', key, value });
      } else {
        const prop = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        properties.push(`${propertyIndent}${prop}: ${value};`);
      }
    }

    // Output current selector block
    if (properties.length > 0 || nestedRules.length === 0) {
      // Output media queries if any
      for (let i = 0; i < mediaStack.length; i++) {
        output.push(`${'  '.repeat(indentLevel + i)}${mediaStack[i]} {`);
      }

      // Output the selector block
      output.push(`${selectorIndent}${selector} {`);
      output.push(...properties);
      output.push(`${selectorIndent}}`);

      // Close media queries if any
      for (let i = mediaStack.length - 1; i >= 0; i--) {
        output.push(`${'  '.repeat(indentLevel + i)}}`);
      }
    }

    // Process nested rules
    for (const rule of nestedRules) {
      if (rule.type === 'at-rule') {
        const newContext = {
          mediaStack: [...mediaStack, rule.key],
          indentLevel: indentLevel
        };
        processRules(selector, rule.value, newContext);
      } else {
        const nestedSelector = rule.key.includes('&')
          ? rule.key.replace(/&/g, selector)
          : `${selector} ${rule.key}`;
        processRules(nestedSelector, rule.value, {
          mediaStack,
          indentLevel: mediaStack.length > 0 ? indentLevel : 0
        });
      }
    }
  }

  // Process all top-level rules
  for (const [selector, styles] of Object.entries(rules)) {
    if (selector.startsWith('@')) {
      processRules('', styles, { mediaStack: [selector], indentLevel: 0 });
    } else {
      processRules(selector, styles, { mediaStack: [], indentLevel: 0 });
    }
  }

  return output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export default createCSS;