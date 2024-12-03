const request = require('supertest');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('./server');


const SECRET_KEY = process.env.SECRET_KEY;

describe('Server API Endpoints', () => {
  let db;

  beforeAll((done) => {
    db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        return done(err);
      }
      db.run(`
        CREATE TABLE patient (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first TEXT,
          last TEXT,
          email TEXT UNIQUE,
          password TEXT,
          provider TEXT,
          usertype TEXT,
          bday TEXT,
          gender TEXT,
          treatment TEXT,
          allergy TEXT,
          comorbid TEXT,
          doctorinfo TEXT,
          medication TEXT
        )
      `, done);
    });
  });

  afterAll((done) => {
    db.close(done);
  });

  test('GET / should return Chatbot API is running!', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Chatbot API is running!');
  });
  
  //Have to change the credentials to something that doesn't exist in the database
  test('POST /signup should create a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        firstName: 'Jack',
        lastName: 'Doe',
        email: 'Jack.doe@example.com',
        password: 'password123',
        healthcareProvider: 'Provider1',
        userType: 'patient'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User added successfully');
  });

  test('POST /login should authenticate user and return token', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    db.run('INSERT INTO patient (first, last, email, password, provider, usertype) VALUES (?, ?, ?, ?, ?, ?)', 
      ['John', 'Doe', 'john.doe@example.com', hashedPassword, 'Provider1', 'patient']);

    const res = await request(app)
      .post('/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123',
        userType: 'patient'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /signout should sign out user and blacklist token', async () => {
    const token = jwt.sign({ email: 'john.doe@example.com' }, SECRET_KEY, { expiresIn: '1h' });
    const res = await request(app)
      .post('/signout')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Signed out successfully');
  });

  test('GET /profile should return user profile', async () => {
    const token = jwt.sign({ email: 'john.doe@example.com' }, SECRET_KEY, { expiresIn: '1h' });
    const res = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('profile');
  });

  test('GET /profilelist should return list of profiles', async () => {
    const token = jwt.sign({ email: 'john.doe@example.com' }, SECRET_KEY, { expiresIn: '1h' });
    const res = await request(app)
      .get('/profilelist')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('profile');
  });

  test('PUT /update-user should update user details', async () => {
    const token = jwt.sign({ email: 'john.doe@example.com' }, SECRET_KEY, { expiresIn: '1h' });
    const res = await request(app)
      .put('/update-user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        first: 'John',
        last: 'Doe',
        provider: 'Provider1',
        bday: '1990-01-01',
        gender: 'Male',
        emergencyphone: '1234567890',
        cancerdetail: 'Detail',
        treatment: 'Treatment',
        allergy: 'None',
        comorbid: 'None',
        doctorinfo: 'Info',
        medication: 'Medication'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User updated successfully');
  });

  test('POST /chat should return personalized advice', async () => {
    const token = jwt.sign({ email: 'john.doe@example.com' }, SECRET_KEY, { expiresIn: '1h' });
    const res = await request(app)
      .post('/chat')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'What should I do after chemotherapy?' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('reply');
  });
});