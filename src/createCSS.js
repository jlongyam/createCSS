// ES5
function createCSS(rules) {
  var output = [];

  function processRules(selector, styles, context) {
    if ( context === void 0 ) context = { mediaStack: [], indentLevel: 0 };

    var mediaStack = context.mediaStack;
    var indentLevel = context.indentLevel;
    var propertyIndent = '  '.repeat(indentLevel + mediaStack.length + 1);
    var selectorIndent = '  '.repeat(indentLevel + mediaStack.length);

    // Separate properties from nested rules
    var properties = [];
    var nestedRules = [];

    Object.entries(styles).forEach(function (ref) {
      var key = ref[0];
      var value = ref[1];

      if (key.startsWith('@')) {
        nestedRules.push({ type: 'at-rule', key: key, value: value });
      } else if (typeof value === 'object' && value !== null) {
        nestedRules.push({ type: 'selector', key: key, value: value });
      } else {
        var prop = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        properties.push(("" + propertyIndent + prop + ": " + value + ";"));
      }
    });

    // Output current selector block
    if (properties.length > 0 || nestedRules.length === 0) {
      // Output media queries if any
      for (var i = 0; i < mediaStack.length; i++) {
        output.push(("" + ('  '.repeat(indentLevel + i)) + (mediaStack[i]) + " {"));
      }

      // Output the selector block
      output.push(("" + (selectorIndent) + selector + " {"));
      properties.forEach(function (prop) { return output.push(prop); });
      output.push((selectorIndent + "}"));

      // Close media queries if any
      for (var i$1 = mediaStack.length - 1; i$1 >= 0; i$1--) {
        output.push((('  '.repeat(indentLevel + i$1)) + "}"));
      }
    }

    // Process nested rules
    nestedRules.forEach(function (rule) {
      if (rule.type === 'at-rule') {
        var newContext = {
          mediaStack: mediaStack.concat( [rule.key]),
          indentLevel: indentLevel
        };
        processRules(selector, rule.value, newContext);
      } else {
        var nestedSelector = rule.key.includes('&')
          ? rule.key.replace(/&/g, selector)
          : (selector + " " + (rule.key));
        processRules(nestedSelector, rule.value, {
          mediaStack: mediaStack,
          indentLevel: mediaStack.length > 0 ? indentLevel : 0
        });
      }
    });
  }

  // Process all top-level rules
  Object.entries(rules).forEach(function (ref) {
    var selector = ref[0];
    var styles = ref[1];

    if (selector.startsWith('@')) {
      processRules('', styles, { mediaStack: [selector], indentLevel: 0 });
    } else {
      processRules(selector, styles, { mediaStack: [], indentLevel: 0 });
    }
  });

  return output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export default createCSS;