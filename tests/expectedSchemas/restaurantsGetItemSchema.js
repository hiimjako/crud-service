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
  'summary': 'Returns the item with specific ID from the restaurants collection.',
  'tags': [
    'Restaurants',
  ],
  'params': {
    'type': 'object',
    'properties': {
      'id': {
        'type': 'string',
        'description': 'The ID of the item to retrieve information for',
      },
    },
    'operationId': 'restaurants__MIA__getItem__MIA__params',
  },
  'querystring': {
    'operationId': 'restaurants__MIA__getItem__MIA__querystring',
    'type': 'object',
    'properties': {
      '_p': {
        'type': 'string',
        'description': 'Return only the properties specified in a comma separated list',
        'examples': [
          'field1,field2,field3.nestedField',
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
        'format': 'date-time',
      },
      'updaterId': {
        'type': 'string',
      },
      'updatedAt': {
        'type': 'string',
        'format': 'date-time',
      },
      'ingredients': {
        'type': 'array',
        'items': {
          'type': 'string',
        },
      },
      'location': {
        'type': 'object',
        'properties': {
          'type': {
            'type': 'string',
          },
          'coordinates': {
            'type': 'array',
            'items': {
              'type': 'number',
            },
          },
        },
      },
      'type': {
        'type': 'string',
      },
    },
    'patternProperties': {
      'location.': true,
      'coordinates\\.\\d+$': {
        'type': 'number',
      },
    },
    'additionalProperties': false,
  },
  'response': {
    '200': {
      'operationId': 'restaurants__MIA__getItem__MIA__response.200',
      'type': 'object',
      'properties': {
        '_id': {
          'type': 'string',
          'pattern': '^[a-fA-F0-9]{24}$',
          'nullable': false,
        },
        '__STATE__': {
          'type': 'string',
          'enum': [
            'PUBLIC',
            'DRAFT',
            'TRASH',
            'DELETED',
          ],
          'nullable': false,
        },
        'creatorId': {
          'type': 'string',
          'nullable': false,
        },
        'createdAt': {
          'type': 'string',
          'format': 'date-time',
          'nullable': false,
        },
        'updaterId': {
          'type': 'string',
          'nullable': false,
        },
        'updatedAt': {
          'type': 'string',
          'format': 'date-time',
          'nullable': false,
        },
        'ingredients': {
          'type': 'array',
          'items': {
            'type': 'string',
          },
          'nullable': true,
        },
        'location': {
          'type': 'object',
          'properties': {
            'type': {
              'type': 'string',
            },
            'coordinates': {
              'type': 'array',
              'items': {
                'type': 'number',
              },
            },
          },
          'nullable': true,
        },
      },
    },
  },
}
