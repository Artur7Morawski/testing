export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow unreliable Playwright functions that can lead to flaky tests',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      networkIdle: "Avoid using waitForLoadState('networkidle') as it can lead to flaky tests",
      domContentLoaded: "Avoid using waitForLoadState('domcontentloaded') as it can lead to flaky tests",
      waitForUrl: 'Avoid using waitForURL() as it can lead to flaky tests. Use explicit element waiting instead',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.property &&
          node.callee.property.name === 'waitForLoadState'
        ) {
          if (node.arguments.length > 0) {
            const firstArg = node.arguments[0];
            if (firstArg.type === 'Literal' && typeof firstArg.value === 'string') {
              if (firstArg.value === 'networkidle') {
                context.report({ node: firstArg, messageId: 'networkIdle' });
              }
              if (firstArg.value === 'domcontentloaded') {
                context.report({ node: firstArg, messageId: 'domContentLoaded' });
              }
            }
          }
        }
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.property &&
          node.callee.property.name === 'waitForURL'
        ) {
          context.report({ node: node.callee.property, messageId: 'waitForUrl' });
        }
      },
    };
  },
}; 