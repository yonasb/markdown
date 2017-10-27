const extensions = require('../../../readme-oas-extensions');
const generateCodeSnippet = require('../../src/lib/generate-code-snippet');

const oas = {
  servers: [{ url: 'http://example.com' }],
};

const operation = {
  path: '/path/{id}',
  method: 'get',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
    },
  ],
};

const values = { path: { id: 123 } };

test('should generate a HTML snippet for each lang', () => {
  const snippet = generateCodeSnippet(oas, operation, {}, 'node');

  expect(typeof snippet).toBe('string');
  expect(snippet).toEqual(expect.stringMatching(/cm-s-tomorrow-night/));
});

test('should pass through values to code snippet', () => {
  const snippet = generateCodeSnippet(oas, operation, values, 'node');

  expect(snippet).toEqual(expect.stringMatching('http://example.com/path/123'));
});

test('should not contain proxy url', () => {
  const snippet = generateCodeSnippet(
    Object.assign({}, oas, { [extensions.PROXY_ENABLED]: true }),
    operation,
    values,
    'node',
  );

  expect(snippet).toEqual(expect.stringMatching('http://example.com/path/123'));
});