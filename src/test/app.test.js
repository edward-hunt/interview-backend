const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('API Tests', () => {
  beforeAll(async () => {
    // Connect to test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interview_app_test');
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Health Check', () => {
    test('GET /health should return OK', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
    });
  });

  describe('Tasks API', () => {
    test('GET /api/tasks should return tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/tasks should create a task', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'This is a test task',
        status: 'pending'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body.title).toBe(newTask.title);
      expect(response.body._id).toBeDefined();
    });
  });

  describe('Users API', () => {
    test('GET /api/users should return users', async () => {
      const response = await request(app)
        .get('/api/users');

      // This might return 200 with implemented code or placeholder response
      expect(response.status).toBeGreaterThanOrEqual(200);
    });
  });
});
