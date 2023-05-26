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

const { STATES } = require('../../lib/consts')
const ordersFixture = require('../fixtures/orders')
const addressesFixture = require('../fixtures/addresses')

const expectedOrderDetailsViewDocs = ordersFixture
  .map(order => {
    const { id_address: idAddress, ...viewField } = order
    const {
      _id,
      street,
      house_number: houseNumber,
    } = addressesFixture
      .find(address => address._id.toString() === idAddress.toString())

    return {
      ...viewField,
      address: {
        label: `${street} (${houseNumber})`,
        value: _id,
      },
    }
  })

const expectedOrderDetailsViewDocsPublic = expectedOrderDetailsViewDocs
  .filter(doc => doc.__STATE__ === STATES.PUBLIC)

const expectedAddressLookup = addressesFixture
  .map(address => ({
    label: `${address.street} (${address.house_number})`,
    value: address._id,
  }))

module.exports = {
  lookupAddressPrefix: '/orders-details-endpoint/lookup/address',
  viewPrefix: '/orders-details-endpoint',
  prefix: '/orders-endpoint',
  ordersFixture,
  addressesFixture,
  expectedOrderDetailsViewDocs,
  expectedOrderDetailsViewDocsPublic,
  expectedAddressLookup,
}
