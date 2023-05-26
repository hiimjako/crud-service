/* eslint-disable max-len */
/*
 * Copyright 2023 Mia s.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const tap = require('tap')
const { setUpTest, getHeaders } = require('../httpInterface.utils')
const {
  lookupAddressPrefix,
  addressesFixture,
  ordersFixture,
  expectedAddressLookup,
} = require('./lookup.utils')

const HTTP_PUBLIC_FIXTURES = JSON.parse(JSON.stringify(expectedAddressLookup))


tap.test('HTTP GET /', async t => {
  const tests = [
    {
      name: 'without filters',
      url: '/',
      acl_rows: undefined,
      found: HTTP_PUBLIC_FIXTURES,
    },
  ]


  t.plan(tests.length)
  // it is safe to instantiate the test once, since all
  // the tests only perform reads on the collection
  const { fastify, database } = await setUpTest(t)
  const ordersCollection = database.collection('orders')
  const addressCollection = database.collection('addresses')

  try {
    await ordersCollection.drop()
    await addressCollection.drop()
  } catch (error) { /* NOOP - ignore errors when a resource is missing*/ }

  await ordersCollection.insertMany(ordersFixture)
  await addressCollection.insertMany(addressesFixture)

  // Test endpoints that return JSON payload
  tests.forEach(testConf => {
    const { name, found, ...conf } = testConf

    t.test(name, async t => {
      const response = await fastify.inject({
        method: 'GET',
        url: lookupAddressPrefix + conf.url,
        headers: getHeaders(conf),
      })

      t.test('should return 200', t => {
        t.strictSame(response.statusCode, 200, response.payload)
        t.end()
      })

      t.test('should return "application/json"', t => {
        t.strictSame(response.headers['content-type'], 'application/json')
        t.end()
      })

      t.test('should return the document', t => {
        t.strictSame(JSON.parse(response.payload), found)
        t.end()
      })

      t.test('should keep the document as is in database', async t => {
        const documents = (await addressCollection.find().toArray()).map(address => ({
          label: `${address.street} (${address.house_number})`,
          value: address._id,
        }))
        t.strictSame(documents, expectedAddressLookup)
        t.end()
      })

      t.end()
    })
  })
})
