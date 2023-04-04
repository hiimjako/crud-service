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
  'summary': 'Returns the number of items in the restaurants collection.',
  'tags': [
    'Restaurants Endpoint',
  ],
  'querystring': {
    'operationId': 'restaurants__MIA__count__MIA__querystring',
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
      '_st': {
        'type': 'string',
        'pattern': '(PUBLIC|DRAFT|TRASH|DELETED)(,(PUBLIC|DRAFT|TRASH|DELETED))*',
        'default': 'PUBLIC',
        'description': 'Filter by \\_\\_STATE__, multiple states can be specified in OR by providing a comma separated list',
      },
      '_rawp': {
        'type': 'string',
        'description': 'Additional raw stringified projection for MongoDB',
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
      'name': {
        'type': 'string',
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
    'additionalProperties': false,
  },
  'response': {
    '200': {
      'operationId': 'restaurants__MIA__count__MIA__response.200',
      'type': 'integer',
      'minimum': 0,
    },
  },
}
