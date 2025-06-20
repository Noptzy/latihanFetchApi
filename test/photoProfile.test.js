const request = require('supertest');
const app = require('../app');
const path = require('path');

describe('PUT /api/v1/users/:id', () => {
    it('should update user profile with photo', async () => {
        const userId = 1; // ganti sesuai id user yang ada di database

        const res = await request(app)
            .put(`/api/v1/users/${userId}`) // ← gunakan path relatif
            .field('name', 'Updated Name')
            .field('email', 'updatedemail@example.com')
            .attach('photoProfile', path.resolve(__dirname, 'dummy.jpg'));

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Updated Name');
        expect(res.body.data.photoProfile).toBeDefined();
    });
});