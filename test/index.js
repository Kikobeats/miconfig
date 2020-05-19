'use strict'

const test = require('ava')

const miconfig = require('..')

const mock = props => ({
  default: {
    ...process.env,
    foo: 'bar',
    ...props
  }
})

test('throw an error if a reserved key is used', t => {
  miconfig.RESERVED_KEYS.forEach(key => {
    const error = t.throws(() => miconfig(mock({ [key]: true })))
    t.is(error.name, 'Error')
    t.is(
      error.message,
      `The following reserved word(s) can't be used as key: ${key}`
    )
  })
})

test('access keys from config', t => {
  const config = miconfig(mock())
  t.is(config.foo, 'bar')
  t.is(config.hello, undefined)
})

test('access required keys from config', t => {
  const { required } = miconfig(mock())
  t.is(required.foo, 'bar')
  const error = t.throws(() => required.hello)
  t.is(error.name, 'TypeError')
  t.is(error.message, 'Required key `hello` not found at `test` environment.')
})

test('.get', t => {
  const config = miconfig(mock())
  t.is(config.get('foo'), 'bar')
  t.is(config.get('hello'), undefined)
  t.is(config.get('hello', 'world'), 'world')
})

test('.has', t => {
  const config = miconfig(mock())
  t.is(config.has('foo'), true)
  t.is(config.has('hello'), false)
  t.is(config.has('foo.bar'), false)
})

test('.require', t => {
  const config = miconfig(mock())
  t.is(config.require('foo'), 'bar')
  const error = t.throws(() => config.require('hello'))
  t.is(error.name, 'TypeError')
  t.is(error.message, 'Required key `hello` not found at `test` environment.')
})
