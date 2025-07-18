export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Disallow redundant state: 'visible' in Playwright's waitFor method",
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      redundantVisible: "Redundant state: 'visible' in waitFor() call. 'visible' is the default state.",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.property &&
          node.callee.property.name === 'waitFor'
        ) {
          if (node.arguments.length > 0) {
            const firstArg = node.arguments[0];
            if (firstArg.type === 'ObjectExpression') {
              const stateProperty = firstArg.properties.find(
                (prop) =>
                  prop.key &&
                  prop.key.name === 'state' &&
                  prop.value &&
                  prop.value.type === 'Literal' &&
                  prop.value.value === 'visible'
              );
              if (stateProperty) {
                context.report({
                  node: stateProperty,
                  messageId: 'redundantVisible',
                  fix(fixer) {
                    // If only property, remove entire arg
                    if (firstArg.properties.length === 1) {
                      if (node.arguments.length === 1) {
                        return fixer.replaceText(firstArg, '');
                      }
                      return fixer.replaceText(firstArg, '{}');
                    }
                    // Remove property and trailing/leading comma
                    const sourceCode = context.getSourceCode();
                    const tokensBefore = sourceCode.getTokensBefore(stateProperty, { count: 1 });
                    const tokensAfter = sourceCode.getTokensAfter(stateProperty, { count: 1 });
                    const commaAfter = tokensAfter.length && tokensAfter[0].value === ',';
                    const commaBefore = tokensBefore.length && tokensBefore[0].value === ',';

                    if (commaAfter) {
                      return fixer.removeRange([stateProperty.range[0], tokensAfter[0].range[1]]);
                    }
                    if (commaBefore) {
                      return fixer.removeRange([tokensBefore[0].range[0], stateProperty.range[1]]);
                    }
                    return fixer.remove(stateProperty);
                  },
                });
              }
            }
          }
        }
      },
    };
  },
}; 