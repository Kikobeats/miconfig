<p align="center">
  <img src="https://absurd.design/assets/img/chapter1/gallery-color-69-3.jpg" alt="miconfig">
</p>

![Last version](https://img.shields.io/github/tag/Kikobeats/miconfig.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/com/Kikobeats/miconfig/master.svg?style=flat-square)](https://travis-ci.com/Kikobeats/miconfig)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/miconfig.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/miconfig)
[![Dependency status](https://img.shields.io/david/Kikobeats/miconfig.svg?style=flat-square)](https://david-dm.org/Kikobeats/miconfig)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/miconfig.svg?style=flat-square)](https://david-dm.org/Kikobeats/miconfig#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/miconfig.svg?style=flat-square)](https://www.npmjs.org/package/miconfig)

**miconfig** — Configuration loader for Node.js, browsers & Deno.

## Features

* **Easy**: Designed for situations where a PhD into load configurations is infeasible.
* **Lightweight**: no bloat, less than 1KB with all dependencies.
* **Isomorphic**: Compatible with Node.js, browsers & Deno.
* **Flexible**: Super easy load any kind of configuration.
* **Simple**: The whole module is ~50 lines of code.

## Install

```bash
$ npm install miconfig --save
```

## Usage

### Load Configuration Files

In **miconfig**, a configuration has a `NODE_ENV` value associated.

You can load them for anywhere, e.g., from a folder called `config`:

```bash
.
├── index.js
└── config
   ├── default.js
   ├── production.js
   ├── staging.js
   └── test.js
```

Just call **miconfig** for creating them:

```js
const loadConfig = require('miconfig')

const config = loadConfig({
  default: require('./config/default'),
  production: require('./config/production'),
  staging: require('./config/staging'),
  test: require('./config/test')
})
```

The configuration `default` will always be  loaded, being possible overwrite these defaults values by the current `NODE_ENV` configuration.

### Accessing to configuration

After **miconfig** loads your configuration, you can safely access to any value:

```js
// read a value, don't care if it's empty
const database = config.get('database')

// read a value, use a default if empty
const database = config.get('database', 'localhost')

// read a value, throw an error if it doesn't exist
const database = config.require('database')

// check if a value exists
if (env.has('feature.prerender')) {
  console.log('prerender is enabled')
}
```

Additionally, you can retrieve more than one value at one time with destructuring assignment:

```js
// read multiple values, don't care if it's empty
const { timezone, database } = config

// read multiple values, throw an error if it doesn't exist
const { timezone, database } = config.required
```

## License

**miconfig** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/miconfig/blob/master/LICENSE.md) License. Logo by [Absurd Design](https://absurd.design).<br>

Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/miconfig/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
