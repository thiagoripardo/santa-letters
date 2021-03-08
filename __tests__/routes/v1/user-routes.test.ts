import request from 'supertest';
import http from 'http';
import Server from '../../../src/server';

describe('USER TEST', () => {
  let server: http.Server;
  const prefix = '/api/v1';

  beforeAll(async () => {
    server = (new Server()).start();
  });

  afterAll(async () => {
    server.close();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  describe('GET /user/:id', () => {
    it('Return a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/user/asd`)
        .set('Content-Type', 'application/json')
        .set('Authorization', "token");
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('PATCH /user/:id', () => {
    it('Patch a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/user/asd`)
        .send({})
        .set('Content-Type', 'application/json')
        .set('Authorization', "token");
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('DELETE /user/:id', () => {
    it('Delete a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/user/asd`)
        .set('Content-Type', 'application/json')
        .set('Authorization', "token");
      expect(res.status).toBe(200);

      done();
    });
  });
});