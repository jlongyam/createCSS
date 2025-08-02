export default function createCSS(rules, options = { indent: 2, addSemicolons: true }) {
// function generatePrettyCSS(rules, options = { indent: 4, addSemicolons: true }) {
  const indent = options.indent || 4;
  const spaces = ' '.repeat(indent);
  const hasSemicolons = options.addSemicolons !== false;

  const topLevelAtRules = new Set([
    '@keyframes',
    '@font-face',
    '@import',
    '@charset',
    '@supports',
    '@document',
    '@namespace'
  ]);

  // Store @rules (like @keyframes) — we'll output them first
  const atRules = new Map();

  // Store normal rules (selectors) to output after @rules
  const normalRules = new Map();

  // Process each rule
  for (const [selector, declarations] of Object.entries(rules)) {
    let hasAtRule = false;
    for (const prop in declarations) {
      if (topLevelAtRules.has(prop)) {
        atRules.set(prop, declarations[prop]);
        hasAtRule = true;
      }
    }
    if (!hasAtRule) {
      normalRules.set(selector, declarations);
    }
  }

  let css = '';

  // ✅ Step 1: Output all @keyframes and @media-like rules first
  for (const [ruleName, ruleValue] of atRules.entries()) {
    css += `${ruleName} {\n`;
    for (const prop in ruleValue) {
      const value = ruleValue[prop];
      if (typeof value === 'object' && value !== null) {
        css += `${spaces}${prop} {\n`;
        for (const subProp in value) {
          const subValue = value[subProp];
          const subPropName = subProp.replace(/([A-Z])/g, '-$1').toLowerCase();
          css += `${spaces}  ${subPropName}: ${subValue}${hasSemicolons ? ';' : ''}\n`;
        }
        css += `${spaces}}\n`;
      } else {
        css += `${spaces}${prop}: ${value}${hasSemicolons ? ';' : ''}\n`;
      }
    }
    css += `}\n\n`;
  }

  // ✅ Step 2: Output normal rules (selectors) after @rules
  for (const [selector, declarations] of normalRules.entries()) {
    const processRule = (sel, decls, level = 0) => {
      const indentLevel = spaces.repeat(level);
      const innerIndent = spaces.repeat(level + 1);
      const lines = [];

      for (const prop in decls) {
        const value = decls[prop];

        // Handle & @media
        if (prop.startsWith('& @media')) {
          const mediaQuery = prop.replace('& @media', '').trim();
          css += `${indentLevel}@media ${mediaQuery} {\n`;
          processRule(sel, value, level + 1);
          css += `${indentLevel}}\n\n`;
          continue;
        }

        // Handle & selector (e.g., &:hover)
        if (prop.startsWith('&')) {
          const relative = prop.slice(1).trim();
          const fullSel = sel + relative;
          css += `${indentLevel}${fullSel} {\n`;
          processRule('', value, level + 1);
          css += `${indentLevel}}\n\n`;
          continue;
        }

        // Handle regular CSS property
        if (typeof value !== 'object' || value === null) {
          const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
          lines.push(`${innerIndent}${cssProp}: ${value}${hasSemicolons ? ';' : ''}`);
        } else {
          const fullSel = sel + prop;
          css += `${indentLevel}${fullSel} {\n`;
          processRule('', value, level + 1);
          css += `${indentLevel}}\n\n`;
        }
      }

      if (sel && lines.length > 0) {
        css += `${indentLevel}${sel} {\n`;
        css += lines.join('\n') + '\n';
        css += `${indentLevel}}\n\n`;
      }
    };

    processRule(selector, declarations);
  }

  return css.trim();
}