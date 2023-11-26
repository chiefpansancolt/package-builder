/** @type {import('prettier').Options} */
module.exports = {
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 120,
//   plugins: ['prettier-plugin-apex'],
  singleQuote: true,
  semi: false,
  overrides: [
		{
			files: '**/lwc/**/*.html',
			options: { parser: 'lwc' }
		},
		{
			files: '*.{cmp,page,component}',
			options: { parser: 'html' }
		}
	],
}
