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
  'summary': 'Insert new items in the books collection.',
  'tags': [
    'books endpoint',
    'Library',
  ],
  'body': {
    'operationId': 'books__MIA__postBulk__MIA__body',
    'type': 'array',
    'items': {
      'type': 'object',
      'required': [
        'name',
        'isbn',
      ],
      'properties': {
        'name': {
          'type': 'string',
          'description': 'The name of the book',
          'nullable': true,
        },
        'isbn': {
          'type': 'string',
          'description': 'The isbn code',
        },
        'price': {
          'type': 'number',
          'description': 'The price of the book',
        },
        'author': {
          'type': 'string',
          'description': 'The author of the book',
        },
        'authorAddressId': {
          'type': 'string',
          'description': 'The address of the author',
          'pattern': '^[a-fA-F\\d]{24}$',
          'example': '000000000000000000000000',
        },
        'isPromoted': {
          'type': 'boolean',
          'description': "If it's in promotion",
        },
        'publishDate': {
          'type': 'string',
          'example': '1997-04-24T07:00:00.000Z',
          'pattern': '^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,3})?(Z|[+-]\\d{2}:\\d{2}))?$',
          'description': 'The date it was published',
          'nullable': true,
        },
        'position': {
          'type': 'array',
          'items': {
            'type': 'number',
          },
          'minItems': 2,
          'maxItems': 3,
          'description': 'The position of the book',
        },
        'tags': {
          'type': [
            'array',
            'string',
          ],
          'anyOf': [
            {
              'type': 'array',
              'items': {
                'type': 'string',
              },
            },
            {
              'type': 'string',
            },
          ],
          'description': 'Tags',
        },
        'tagIds': {
          'type': [
            'array',
            'number',
          ],
          'anyOf': [
            {
              'type': 'array',
              'items': {
                'type': 'number',
              },
            },
            {
              'type': 'number',
            },
          ],
          'description': 'Tag identification numbers',
        },
        'additionalInfo': {
          'type': 'object',
          'additionalProperties': true,
          'nullable': true,
        },
        'signature': {
          'type': 'object',
          'additionalProperties': true,
          'properties': {
            'name': {
              'type': 'string',
            },
          },
          'required': [
            'name',
          ],
          'nullable': true,
        },
        'metadata': {
          'type': 'object',
          'additionalProperties': false,
          'properties': {
            'somethingString': {
              'type': 'string',
            },
            'somethingNumber': {
              'type': 'number',
            },
            'somethingArrayObject': {
              'type': 'array',
              'items': {
                'type': 'object',
                'properties': {
                  'arrayItemObjectChildNumber': {
                    'type': 'number',
                  },
                  'anotherNumber': {
                    'type': 'number',
                  },
                  'anotherObject': {
                    'type': 'object',
                    'nullable': true,
                  },
                },
                'additionalProperties': true,
                'required': [
                  'arrayItemObjectChildNumber',
                ],
              },
            },
            'somethingObject': {
              'type': 'object',
              'properties': {
                'childNumber': {
                  'type': 'number',
                },
              },
              'additionalProperties': true,
            },
            'somethingArrayOfNumbers': {
              'type': 'array',
              'items': {
                'type': 'number',
              },
            },
            'exampleArrayOfArray': {
              'type': 'array',
              'items': {
                'type': 'array',
                'items': {
                  'type': 'string',
                },
              },
            },
          },
          'required': [
            'somethingNumber',
          ],
        },
        'attachments': {
          'type': [
            'array',
            'object',
            'null',
          ],
          'anyOf': [
            {
              'type': 'array',
              'items': {
                'type': 'object',
                'additionalProperties': false,
                'properties': {
                  'name': {
                    'type': 'string',
                  },
                  'detail': {
                    'type': 'object',
                    'properties': {
                      'size': {
                        'type': 'number',
                      },
                    },
                  },
                  'neastedArr': {
                    'type': 'array',
                    'items': {
                      'type': 'number',
                    },
                  },
                  'additionalInfo': {
                    'type': 'object',
                    'additionalProperties': true,
                  },
                  'other': {
                    'type': 'string',
                  },
                  'size': {
                    'type': 'number',
                  },
                  'stuff': {
                    'type': 'number',
                  },
                  'more': {
                    'type': 'array',
                    'items': {
                      'type': 'string',
                    },
                  },
                },
                'required': [
                  'name',
                ],
                'nullable': true,
              },
              'nullable': true,
            },
            {
              'type': 'object',
              'additionalProperties': false,
              'properties': {
                'name': {
                  'type': 'string',
                },
                'detail': {
                  'type': 'object',
                  'properties': {
                    'size': {
                      'type': 'number',
                    },
                  },
                },
                'neastedArr': {
                  'type': 'array',
                  'items': {
                    'type': 'number',
                  },
                },
                'additionalInfo': {
                  'type': 'object',
                  'additionalProperties': true,
                },
                'other': {
                  'type': 'string',
                },
                'size': {
                  'type': 'number',
                },
                'stuff': {
                  'type': 'number',
                },
                'more': {
                  'type': 'array',
                  'items': {
                    'type': 'string',
                  },
                },
              },
              'required': [
                'name',
              ],
              'nullable': true,
            },
          ],
          'nullable': true,
        },
        'editionsDates': {
          'type': [
            'array',
            'object',
            'null',
          ],
          'anyOf': [
            {
              'type': 'array',
              'items': {
                'type': 'object',
                'additionalProperties': true,
                'nullable': true,
              },
              'nullable': true,
            },
            {
              'type': 'object',
              'additionalProperties': true,
              'nullable': true,
            },
          ],
          'nullable': true,
        },
        '__STATE__': {
          'type': 'string',
          'enum': [
            'PUBLIC',
            'DRAFT',
            'TRASH',
            'DELETED',
          ],
          'description': 'The state of the document',
          'default': 'DRAFT',
        },
      },
      'additionalProperties': false,
    },
  },
  'response': {
    '200': {
      'operationId': 'books__MIA__postBulk__MIA__response.200',
      'type': 'array',
      'items': {
        'type': 'object',
        'properties': {
          '_id': {
            'type': 'string',
            'description': 'Hexadecimal identifier of the document in the collection',
            'pattern': '^[a-fA-F\\d]{24}$',
            'example': '000000000000000000000000',
          },
        },
      },
    },
  },
}
