const request = require("supertest");
const app = require('../../app');
const db = require("../../app/models");

describe('Tutorial tests', () => {
    it('should be able to add a tutorial', async () => {
        const body = {
            "title": "A Title",
            "description": "Desc",
            "published": "false"
        };
        
        return request(app)
            .post("/api/tutorials")
            .send(body)
            .expect(200)
            .then(r => {
                const response = JSON.parse(r.text);
                expect(response.title).toEqual(body.title);
            });
    });

    afterAll((done) => {
        db.mongoose.disconnect(done);
    });
});