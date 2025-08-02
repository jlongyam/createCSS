export default function createCSS(rules, options = { indent: 2, addSemicolons: true }) {
  const indent = options.indent || 4;
  const spaces = ' '.repeat(indent);
  const hasSemicolons = options.addSemicolons !== false;
  let css = '';

  const topLevelAtRules = new Set([
    '@keyframes',
    '@font-face',
    '@import',
    '@charset',
    '@supports',
    '@document',
    '@namespace'
  ]);

  function processRule(selector, declarations, level = 0) {
    const indentLevel = spaces.repeat(level);
    const innerIndent = spaces.repeat(level + 1);
    const lines = [];

    for (const prop in declarations) {
      const value = declarations[prop];

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if (topLevelAtRules.has(prop)) {
          css += `${indentLevel}${prop} {\n`;
          processRule('', value, level + 1);
          css += `${indentLevel}}\n\n`;
        } else if (prop.startsWith('& @media')) {
          const mediaQuery = prop.replace('& @media', '').trim();
          css += `${indentLevel}@media ${mediaQuery} {\n`;
          processRule(selector, value, level + 1);
          css += `${indentLevel}}\n\n`;
        } else if (prop.startsWith('&')) {
          const relativeSelector = prop.slice(1).trim();
          const fullSelector = selector + relativeSelector;
          css += `${indentLevel}${fullSelector} {\n`;
          processRule('', value, level + 1);
          css += `${indentLevel}}\n\n`;
        } else {
          const fullSelector = selector + prop;
          css += `${indentLevel}${fullSelector} {\n`;
          processRule('', value, level + 1);
          css += `${indentLevel}}\n\n`;
        }
      } else {
        const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        lines.push(`${innerIndent}${cssProp}: ${value}${hasSemicolons ? ';' : ''}`);
      }
    }

    if (selector) {
      css += `${indentLevel}${selector} {\n`;
      css += lines.join('\n') + '\n';
      css += `${indentLevel}}\n\n`;
    } else {
      css += lines.join('\n') + '\n';
    }
  }

  for (const selector in rules) {
    processRule(selector, rules[selector], 0);
  }

  return css.trim();
}