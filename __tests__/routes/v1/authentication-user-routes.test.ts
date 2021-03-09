import request from 'supertest';
import http from 'http';
import Server from '../../../src/server';

describe('AUTHENTICATION & USER TEST', () => {
  let server: http.Server;
  const prefix = '/api/v1';
  let userPayload = {
    username: 'santac1',
    password: '12345'
  };
  let user = {};
  let token: string;

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
        .send(userPayload)
        .set('Content-Type', 'application/json');
      user = res.body;
      expect(res.status).toBe(201);
      done();
    });
  });

  describe('POST /auth/login', () => {
    it('Login the user with status 200 and return the token', async (done) => {
      const res = await request(server).post(`${prefix}/auth/login`)
        .send(userPayload)
        .set('Content-Type', 'application/json');
      token = res.body.token;
      expect(res.status).toBe(201);
      done();
    });
  });

  describe('GET /user/:id', () => {
    it('Return a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/user/${user.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('PATCH /user/:id', () => {
    it('Patch a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/user/${user.id}`)
        .send({
          username: 'santac2'
        })
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('DELETE /user/:id', () => {
    it('Delete a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/user/${user.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });
});