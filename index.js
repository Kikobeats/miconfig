/* global Deno */

'use strict'

const dlv = require('dlv')

const { NODE_ENV } =
  typeof process === 'object'
    ? process.env
    : typeof Deno !== 'undefined'
      ? Deno.env()
      : {}

const RESERVED_KEYS = ['get', 'has', 'require', 'required']

const throwRequireKeyError = key => {
  throw new TypeError(
    `Required key \`${key}\` not found at \`${NODE_ENV}\` environment.`
  )
}

module.exports = ({ default: base, ...envs }) => {
  const config = { ...base, ...envs[NODE_ENV] }

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
    value: dlv.bind(dlv, config)
  })

  Object.defineProperty(config, 'has', {
    enumerable: false,
    value: key => key in config
  })

  Object.defineProperty(config, 'require', {
    enumerable: false,
    value: key =>
      config.has(key) ? config.get(key) : throwRequireKeyError(key)
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
