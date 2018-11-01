import request from 'supertest';
import app from './app';
import MongodbMemoryServer from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Glossary from './model';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

let server = new MongodbMemoryServer();

beforeAll(async () => {
    const uri = await server.getConnectionString();
    await mongoose.connect(
        uri,
        { useNewUrlParser: true },
        err => {
            if (err) console.error(err);
        }
    );
});

afterEach(async () => {
    await mongoose.connection.dropDatabase();
});

afterAll(() => {
    mongoose.disconnect();
    server.stop();
});

const dummyData = {
    english: 'Good Morning!',
    german: 'Guten Morgen!'
};

const createDummy = async () => {
    const glossary = new Glossary(dummyData);
    try {
        return await glossary.save();
    } catch (err) {
        console.log(err);
    }
};

describe('Endpoint tests', () => {
    it('ping should be pong', async () => {
        return await request(app)
            .get('/ping')
            .expect(200, 'pong');
    });

    it('get all glossary items', async () => {
        let dummy = await createDummy();

        return await request(app)
            .get('/api/v1/glossary')
            .expect(200, JSON.stringify([dummy]));
    });

    it('create glossary item', async () => {
        return await request(app)
            .post('/api/v1/glossary')
            .send(dummyData)
            .expect(201);
    });

    it('get a glossary item', async () => {
        let dummy = await createDummy();

        return await request(app)
            .get(`/api/v1/glossary/${dummy._id}`)
            .expect(200, JSON.stringify(dummy));
    });

    it('update a glossary item', async () => {
        let dummy = await createDummy();

        return await request(app)
            .put(`/api/v1/glossary/${dummy._id}`)
            .send({ german: 'Morgen!' })
            .expect(200, JSON.stringify({ ...dummy.toObject(), german: 'Morgen!' }));
    });

    it('delete a glossary item', async () => {
        let dummy = await createDummy();

        return await request(app)
            .delete(`/api/v1/glossary/${dummy._id}`)
            .expect(204);
    });
});
