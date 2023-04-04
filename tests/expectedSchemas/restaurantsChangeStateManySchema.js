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

module.exports = {
  'summary': 'Change state of multiple items of restaurants.',
  'tags': [
    'Restaurants Endpoint',
  ],
  'body': {
    'operationId': 'restaurants__MIA__changeStateMany__MIA__body',
    'type': 'array',
    'items': {
      'type': 'object',
      'properties': {
        'filter': {
          'type': 'object',
          'properties': {
            '_id': {
              'type': 'string',
              'pattern': '^[a-fA-F\\d]{24}$',
              'description': 'Hexadecimal identifier of the document in the collection',
              'examples': [
                '000000000000000000000000',
              ],
            },
            'creatorId': {
              'type': 'string',
            },
            'createdAt': {
              'type': 'string',
              'pattern': '^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,3})?(Z|[+-]\\d{2}:\\d{2}))?$',
              'description': '"date-time" according with https://tools.ietf.org/html/rfc3339#section-5.6',
              'examples': [
                '2020-09-16T12:00:00.000Z',
              ],
            },
            'updaterId': {
              'type': 'string',
            },
            'updatedAt': {
              'type': 'string',
              'pattern': '^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,3})?(Z|[+-]\\d{2}:\\d{2}))?$',
              'description': '"date-time" according with https://tools.ietf.org/html/rfc3339#section-5.6',
              'examples': [
                '2020-09-16T12:00:00.000Z',
              ],
            },
            'ingredients': {
              'type': 'array',
            },
            'name': {
              'type': 'string',
            },
            'location': {
              'type': 'array',
              'items': {
                'type': 'number',
              },
              'minItems': 2,
              'maxItems': 3,
            },
            'openedAt': {
              'type': 'string',
              'pattern': '^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,3})?(Z|[+-]\\d{2}:\\d{2}))?$',
              'description': '"date-time" according with https://tools.ietf.org/html/rfc3339#section-5.6',
              'examples': [
                '2020-09-16T12:00:00.000Z',
              ],
            },
            'type': {
              'type': 'string',
            },
          },
          'patternProperties': {
            'coordinates\\.\\d+$': {
              'type': 'number',
            },
          },
        },
        'stateTo': {
          'type': 'string',
          'enum': [
            'PUBLIC',
            'DRAFT',
            'TRASH',
            'DELETED',
          ],
        },
      },
      'required': [
        'filter',
        'stateTo',
      ],
      'additionalProperties': false,
    },
    'minItems': 1,
  },
  'response': {
    '200': {
      'operationId': 'restaurants__MIA__changeStateMany__MIA__response.200',
      'type': 'integer',
      'minimum': 0,
      'description': 'Number of updated restaurants',
    },
  },
}
