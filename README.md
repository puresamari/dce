# DCE

DCE gives the option to create a dom element, attach it to a parent and assign multiple attributes through a function instead of individually.

# Installation

### With npm
`$ npm i -S dce`

### With the wrong package manager
`$ yarn add dce`

# Usage

The function name is dce and if using commonjs can `required`

```js
const { dce } = require('dce');
```

or `imported` if using es6 imports.

```js
import { dce } from 'dce';
```

### Parameter overloading when adding to parent

- `tag`: DOM element tag (for example `p`, `input`, `style`)
- `parent`: the parent node it should be added to
- `attributes`: the DOM element's attributes (derived from the DOM element properties, check out the available ones on [mdn](https://developer.mozilla.org/en-US/docs/Web/API/Node))

For example (using tailwindcss)
```js
import { dce } from 'dce';

const container = dce('div', document.body, {
  className: 'text-2xl text-red mt-4',
  textContent: 'Hello world',
  onclick: () => alert('hello world!')
});

dce('a', container, {
  className: 'text-blue underline hover:no-underline',
  href: 'https://rothert.cc'
})
```

### Parameter overloading when not adding to parent

- `tag`: elements html tag (for example `p`, `input`, `style`)
- `attributes`: the element's attributes (only if applicable for the tag)

For example
```js
import { dce } from 'dce';

const input = dce('input', document.body, {
  className: 'border focus:text-red-500',
  value: 'Hello world',
  onchange: () => alert(`value is "${input.value}"`),
  onblur: () => input.remove()
});
```

# Using dce in other docs

By default dce uses the parent elements doc meaning if you for example want to create an element inside an iframe you can simply set any of the iframes element as parent and its going to use the iframe as docs.

### Example adding meta information inside an iframe
```js
import { dce } from 'dce';

const iframe = dce('iframe', viewerWrapper, {
  className: 'flex flex-col bg-white text-black',
  title: 'Example iframe'
});

const document = iframe.contentWindow.document;

dce('meta', document.head, {
  name: 'viewport',
  content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'
});
```