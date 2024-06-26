const request = require('supertest');
const app = require('./index');

describe('API Endpoints', () => {
    it('should get all pets', async () => {
        const res = await request(app).get('/api/v1/pets');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(3); // assuming you have 3 pets in your data.js
    });

    it('should get a pet by name', async () => {
        const res = await request(app).get('/api/v1/pets/Fido');
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Fido');
    });

    it('should get a pet by owner', async () => {
        const res = await request(app).get('/api/v1/pets/owner?owner=John');
        expect(res.statusCode).toEqual(200);
        expect(res.body.owner).toEqual('John');
    });

    it('should return 404 if pet is not found by name', async () => {
        const res = await request(app).get('/api/v1/pets/Unknown');
        expect(res.statusCode).toEqual(404);
    });

    it('should return 404 if pet is not found by owner', async () => {
        const res = await request(app).get('/api/v1/pets/owner?owner=Unknown');
        expect(res.statusCode).toEqual(404);
    });
});