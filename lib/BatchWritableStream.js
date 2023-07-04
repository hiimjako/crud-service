'use strict'
const { Writable, Transform } = require('stream')

class BatchWritableStream extends Writable {
  constructor(options) {
    super(options)

    if (!options.processBatch) {
      throw new Error('BatchWritableStream requires an async "processBatch" function')
    }

    this.processBatch = options.processBatch
    this.batchSize = options.batchSize || 1000
    this.flushBatch()
  }

  flushBatch() {
    this.batch = []
  }

  _write(chunk, _encoding, callback) {
    this.batch.push(chunk)
    if (this.batch.length >= this.batchSize) {
      this.processBatch(this.batch)
        .then(() => {
          this.flushBatch()
          callback()
        })
        .catch((error) => callback(error))
    } else {
      return callback()
    }
  }

  _final(callback) {
    if (this.batch.length > 0) {
      this.processBatch(this.batch)
        .then(() => {
          this.flushBatch()
          callback()
        })
        .catch((error) => callback(error))
    } else {
      return callback()
    }
  }
}

class createBatchWritableStreamPool extends Transform {
  constructor(options) {
    super(options)
    this.toggle = true
    this.currentStream = 0
    this.poolSize = options.poolSize ?? 1
    this.pool = []
    for (let i = 0; i < this.poolSize; i++) {
      this.pool.push(
        new BatchWritableStream({
          batchSize: 5000,
          highWaterMark: 500,
          objectMode: true,
          processBatch: options.processBatch,
        }).on('error', error => this.emit('error', error))
      )
    }
  }

  _transform(chunk, _encoding, callback) {
    this.pool[this.currentStream].write(chunk)
    this.currentStream = (this.currentStream + 1) % this.pool.length
    callback()
  }

  _final(callback) {
    const finishPromises = this.pool.map(stream =>
      new Promise((resolve, reject) => {
        stream.on('finish', resolve)
        stream.on('error', reject)
        stream.end()
      })
    )
    Promise.all(finishPromises)
      .then(() => callback())
      .catch(callback)
  }
}


module.exports = {
  BatchWritableStream,
  createBatchWritableStreamPool,
}
