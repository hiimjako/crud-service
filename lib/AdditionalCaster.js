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

const through2 = require('through2')
const lget = require('lodash.get')
const lset = require('lodash.set')
const { JSONPath } = require('jsonpath-plus')
const { fieldsToSchema } = require('./AdditionalCaster.utils')
const { getPathFromPointer } = require('./JSONPath.utils')

class AdditionalCaster {
  constructor(collectionDefinition) {
    this._collectionSchema = collectionDefinition.schema ?? fieldsToSchema(collectionDefinition.fields)
  }

  castResultsAsStream() {
    return through2.obj((chunk, _, callback) => {
      const castedChunk = this.castItem(chunk)
      callback(null, castedChunk)
    })
  }

  castItem(item) {
    let response = { ...item, _id: item._id?.toString() }
    const pathToCoordinates = JSONPath({
      json: response,
      path: '$..[?(@property === "coordinates")]',
      resultType: 'pointer',
    })
      .map(getPathFromPointer)

    const pathToDates = JSONPath({
      json: response,
      path: '$..[?(Object.prototype.toString.call(@) === "[object Date]")]',
      resultType: 'pointer',
    })
      .map(getPathFromPointer)

    const pathsToObjectIds = JSONPath({
      json: this._collectionSchema.properties,
      resultType: 'pointer',
      path: '$..[?(@.type === "ObjectId")]',
    })
      .map(getPathFromPointer)

    const pathsToGeoPoint = JSONPath({
      json: this._collectionSchema.properties,
      path: '$..[?(@.type === "GeoPoint")]',
      resultType: 'pointer',
    })
      .map(getPathFromPointer)

    const geoFieldRegexs = pathsToGeoPoint.map(path => new RegExp(`${path.split('.').join('\\.(\\d+\\.)?')}\\.(\\d+\\.)?coordinates`))

    for (const path of pathToCoordinates) {
      if (geoFieldRegexs.some(geoFieldRegex => geoFieldRegex.test(path))) {
        const pathLevels = path
          .split('.')
        const oneLevelUpPath = pathLevels
          .slice(0, pathLevels.length - 1)
          .join('.')
        response = lset(response, oneLevelUpPath, lget(response, path))
      }
    }

    for (const path of pathsToObjectIds) {
      const value = lget(response, path)
      if (value) {
        response = lset(response, path, value.toString())
      }
    }

    for (const path of pathToDates) {
      const value = lget(response, path)
      if (value) {
        response = lset(response, path, value.toISOString())
      }
    }

    return response
  }
}

module.exports = AdditionalCaster
