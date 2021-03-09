import 'dotenv/config';
// import './configs/modules-alias-config';
import request from 'supertest';
import http from 'http';
import mongooseConnection from '../../../src/configs/mongoose-config';
import Server from '../../../src/server';

describe('AUTHENTICATION & USER TEST', () => {
  // let mongooseConnection;
  let server: http.Server;
  const prefix = '/api/v1';
  let userPayload = {
    username: 'santac1',
    password: '12345'
  };
  let letterPayload = {
    subject: "Hi, it's me",
    body: "Hey Santa!"
  }

  interface User {
    _id: string,
    username: string,
  }
  interface Letter {
    _id: string,
    subject: string,
    body: string,
    wasRead: boolean,
  }

  let letter: Letter;
  let user: User;
  let token: string;

  beforeAll(async () => {
    await mongooseConnection();
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
      expect(res.status).toBe(200);
      done();
    });
  });

  describe('GET /user/:id', () => {
    it('Return a user given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/user/${user._id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('PATCH /user/:id', () => {
    it('Patch a user given the id with status 200', async (done) => {
      const res = await request(server).patch(`${prefix}/user/${user._id}`)
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
      const res = await request(server).delete(`${prefix}/user/${user._id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('POST /santas-letters', () => {
    it('Create a letter and return status 201', async (done) => {
      const res = await request(server).post(`${prefix}/santas-letters`)
        .send(letterPayload)
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      letter = res.body;

      expect(res.status).toBe(201);

      done();
    });
  });

  describe('GET /santas-letters', () => {
    it('Return all letters with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/santas-letters`)
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('GET /santas-letters/:id', () => {
    it('Return a letter given the id with status 200', async (done) => {
      const res = await request(server).get(`${prefix}/santas-letters/${letter._id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('PATCH /santas-letters/:id', () => {
    it('Update a letter given the id with status 200', async (done) => {
      const res = await request(server).patch(`${prefix}/santas-letters/${letter._id}`)
        .send({
          body: "Hey Santa, how are you?"
        })
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });

  describe('DELETE /santas-letters/:id', () => {
    it('Delete a letter given the id with status 200', async (done) => {
      const res = await request(server).delete(`${prefix}/santas-letters/${letter._id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
      expect(res.status).toBe(200);

      done();
    });
  });
});