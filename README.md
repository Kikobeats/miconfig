<p align="center">
  <img src="/logo.jpeg" alt="miconfig">
</p>

![Last version](https://img.shields.io/github/tag/Kikobeats/miconfig.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/miconfig.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/miconfig)
[![NPM Status](https://img.shields.io/npm/dm/miconfig.svg?style=flat-square)](https://www.npmjs.org/package/miconfig)

**miconfig** — Configuration loader for Node.js, browsers & Deno.

## Features

- **Easy**: Designed for situations where a PhD into load configurations is infeasible.
- **Lightweight**: no bloat, less than 1KB with all dependencies.
- **Isomorphic**: Compatible with Node.js, browsers & Deno.
- **Flexible**: Super easy load any kind of configuration.
- **Simple**: The whole module is ~50 lines of code.

## Install

```bash
$ npm install miconfig --save
```

## Usage

In **miconfig**, a configuration is identified by environment name.

### Load Configuration Files

Place the configuration files wherever you desire, e.g., in a folder called `config`:

```bash
.
├── index.js
└── config
   ├── default.js
   ├── production.js
   ├── staging.js
   └── test.js
```

Then, load them using **miconfig**:

```js
const loadConfig = require('miconfig')

const FILES = [
  'default',
  NODE_ENV === 'development' ? undefined : NODE_ENV
].filter(Boolean)

const environment = FILES.reduce((acc, key) => {
  acc[key] = require(`./config/${key}`)
  return acc
}, {})

const config = loadConfig(environment)
```

In case you want to use a different file format (like YAML), you've to parser them before be loaded:

```js
const environment = FILES.reduce((acc, key) => {
  acc[key] = fromYaml(`./config/${key}.yml`)
  return acc
}, {})
```

The `default` configuration is always loaded and merged with the target configuration environment.

**miconfig** uses `process.env.NODE_ENV` to determine what configuration should be loaded.

In case you want to use a different source of truth, you can pass it as second argument:

```js
const loadConfig = require('miconfig')

const config = loadConfig(
  {
    default: require('./config/default'),
    production: require('./config/default')
  },
  process.env.APP_ENV
)
```

### Accessing to configuration

After **miconfig** loads your configuration, you can safely access to any value.

#### Safe access

```js
// read a value, don't care if it's empty
const database = config.get('database.url')
```

#### Safe access + default value

```js
// read a value, use a default if empty
const database = config.get('database.url', 'localhost')
```

#### Require access

```js
// read a value, throw an error if it doesn't exist
const database = config.require('database.url')
```

#### Typecheck access

```js
// check if a value exists
if (config.has('feature.prerender')) {
  console.log('prerender is enabled')
}
```

Additionally, you can retrieve more than one value at one time with destructuring assignment:

#### Destructuring safe access

```js
// read multiple values, don't care if it's empty
const { timezone, database } = config
```

#### Destructuring require access

```js
// read multiple values, throw an error if one of them doesn't exist
const { timezone, database } = config.required
```

## License

**miconfig** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/miconfig/blob/master/LICENSE.md) License. Logo by [Absurd Design](https://absurd.design/freelicenset).<br>

Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/miconfig/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
