<p align="center">
  <img src="https://absurd.design/assets/img/chapter1/gallery-color-69-3.jpg" alt="nanoconfig">
</p>

![Last version](https://img.shields.io/github/tag/Kikobeats/nanoconfig.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/com/Kikobeats/nanoconfig/master.svg?style=flat-square)](https://travis-ci.com/Kikobeats/nanoconfig)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/nanoconfig.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/nanoconfig)
[![Dependency status](https://img.shields.io/david/Kikobeats/nanoconfig.svg?style=flat-square)](https://david-dm.org/Kikobeats/nanoconfig)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/nanoconfig.svg?style=flat-square)](https://david-dm.org/Kikobeats/nanoconfig#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/nanoconfig.svg?style=flat-square)](https://www.npmjs.org/package/nanoconfig)

**nanoconfig** — Configuration loader for Node.js, browsers & Deno.

## Features

* **Easy**: Designed for situations where a PhD into load configurations is infeasible.
* **Lightweight**: no bloat, less than 1KB with all dependencies.
* **Isomorphic**: Compatible with Node.js, browsers & Deno.
* **Flexible**: Super easy load any kind of configuration.
* **Simple**: The whole module is ~50 lines of code.

## Install

```bash
$ npm install nanoconfig --save
```

## Usage

### Load Configuration Files

In **nanoconfig**, a configuration has a `NODE_ENV` value associated.

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

Just call **nanoconfig** for creating them:

```js
const loadConfig = require('nanoconfig')

const config = loadConfig({
  default: require('./config/default'),
  production: require('./config/production'),
  staging: require('./config/staging'),
  test: require('./config/test')
})
```

The configuration `default` will always be  loaded, being possible overwrite these defaults values by the current `NODE_ENV` configuration.

### Accessing to configuration

After **nanoconfig** loads your configuration, you can safely access to any value:

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

**nanoconfig** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/nanoconfig/blob/master/LICENSE.md) License. Logo by [Absurd Design](https://absurd.design).<br>

Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/nanoconfig/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
