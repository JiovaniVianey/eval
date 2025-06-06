import request from 'supertest';
import app from '../src/server.js';
import { pool } from '../src/models/db.js';

afterAll(async () => {
  await pool.end();
});

describe('Article API', () => {
  it('GET /articles returns list', async () => {
    const res = await request(app).get('/articles');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
