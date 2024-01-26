import request from 'supertest'

import app from '../src/app'

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app).get('/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(
      200,
      {
        message: 'Welcome to the AlertSite Technical benchmark API 🌎✨👋',
      },
      done
    )
  })
})

describe('GET /api', () => {
  it('responds with a json message', (done) => {
    request(app).get('/api/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(
      200,
      {
        message: 'Api Directory../api/io_alert',
      },
      done
    )
  })
})
