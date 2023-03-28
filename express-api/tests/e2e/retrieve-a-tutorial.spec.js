const { MongoDBContainer, Wait } = require("testcontainers");
const axios = require('axios');

jest.setTimeout(120000);

describe('Retrieve a tutorial', () => {
    let backend;
    beforeAll(async () => {
        backend = await new MongoDBContainer()
            .withName('mongo-test')
            .withWaitStrategy(Wait.forHealthCheck())
            .withStartupTimeout(120000)
            .start();

        process.env.MONGO_URL = backend.getConnectionString();

        server = require("../../server");
    });

    afterAll(async () => {
        await backend.stop();
    });

    describe('given there\'s a tutorial added', () => {

        let id;
        const body = {
            title: "The title",
            description: "The description",
            published: false
        };

        beforeEach(async () => {
            return axios.post('http://localhost:8080/api/tutorials', body).then(response => {
                id = response.data.id;
            });
        });

        it('should be able to retrieve the tutorial', async () => {
            return axios.get(`http://localhost:8080/api/tutorials/${id}`)
                .then(r => {
                    expect(r.data).toEqual(
                        expect.objectContaining({
                            title: body.title,
                            description: body.description,
                            published: body.published,
                            id,
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String)
                        })
                    )
                });
        });
    });

});