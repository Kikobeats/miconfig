/* global Deno */

'use strict'

const autoParse = require('auto-parse')
const merge = require('merge-options')
const dlv = require('dlv')

const getSource = () =>
  (typeof process === 'object'
    ? process.env
    : typeof Deno !== 'undefined'
    ? Deno.env()
    : {}
  ).NODE_ENV

const RESERVED_KEYS = ['get', 'has', 'require', 'required']

const throwRequireKeyError = (key, env) => {
  throw new TypeError(
    `Required key \`${key}\` not found at \`${env}\` environment.`
  )
}

module.exports = ({ default: base, ...envs }, env = getSource()) => {
  const config = merge(base, envs[env])

  const reservedWords = Object.keys(config).filter(key =>
    RESERVED_KEYS.includes(key)
  )

  if (reservedWords.length > 0) {
    throw new Error(
      `The following reserved word(s) can't be used as key: ${reservedWords.join(
        ', '
      )}`
    )
  }

  Object.defineProperty(config, 'get', {
    enumerable: false,
    value: (key, def) => autoParse(dlv(config, key, def))
  })

  Object.defineProperty(config, 'has', {
    enumerable: false,
    value: key => !!config.get(key)
  })

  Object.defineProperty(config, 'require', {
    enumerable: false,
    value: key =>
      config.has(key) ? config.get(key) : throwRequireKeyError(key, env)
  })

  Object.defineProperty(config, 'required', {
    enumerable: false,
    value: new Proxy(config, {
      get: (target, key) => config.require(key)
    })
  })

  return config
}

module.exports.RESERVED_KEYS = RESERVED_KEYS
