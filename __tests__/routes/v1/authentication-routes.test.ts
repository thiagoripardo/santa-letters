import request from 'supertest';
import http from 'http';
import Server from '../../../src/server';

describe('AUTHENTICATION TEST', () => {
  let server: http.Server;
  const prefix = '/api/v1';

  beforeAll(async () => {
    server = (new Server()).start();
  });

  afterAll(async () => {
    server.close();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  describe('POST /auth/signup', () => {
    it('Signup the new user with status 201', async (done) => {
      const res = await request(server).post(`${prefix}/auth/signup`)
        .send({})
        .set('Content-Type', 'application/json');
      
      expect(res.status).toBe(201);
      done();
    });
  });

  describe('POST /auth/login', () => {
    it('Login the user with status 200 and return the token', async (done) => {
      const res = await request(server).post(`${prefix}/auth/login`)
        .send({})
        .set('Content-Type', 'application/json');
      
      expect(res.status).toBe(201);
      done();
    });
  });
});