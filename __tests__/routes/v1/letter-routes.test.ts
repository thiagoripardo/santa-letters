import request from 'supertest';
import http from 'http';
import Server from '../../../src/server';

describe('LETTER TEST', () => {
  let server: http.Server;
  const prefix = '/api/v1';

  beforeAll(async () => {
    server = (new Server()).start();
  });

  afterAll(async () => {
    server.close();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  describe('POST /santas-letters', () => {
    it('Patch a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/santas-letters`)
        .send({})
        .set('Content-Type', 'application/json')
        .set('Authorization', "token");
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('GET /santas-letters', () => {
    it('Return a letter given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/santas-letters`)
        .set('Content-Type', 'application/json')
        .set('Authorization', "token");
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('GET /santas-letters/:id', () => {
    it('Return a letter given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/santas-letters/asd`)
        .set('Content-Type', 'application/json')
        .set('Authorization', "token");
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('PATCH /santas-letters/:id', () => {
    it('Patch a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/santas-letters/asd`)
        .send({})
        .set('Content-Type', 'application/json')
        .set('Authorization', "token");
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('DELETE /santas-letters/:id', () => {
    it('Delete a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/santas-letters/asd`)
        .set('Content-Type', 'application/json')
        .set('Authorization', "token");
      expect(res.status).toBe(200);

      done();
    });
  });
});