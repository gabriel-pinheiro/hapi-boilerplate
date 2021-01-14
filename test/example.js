const App = require('../dist/main');

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Axios = require('axios');

const { expect } = Code;
const { after, before, describe, it } = exports.lab = Lab.script();

describe('main', () => {
    let server;
    let api = Axios.create({
        baseURL: 'http://localhost:8080'
    });

    before(async () => {
        server = await App.server;
    });

    after(async () => {
        await server.stop();
    });

    it('should succeed on getting cats', async () => {
        const { status } = await api.get('/cats');
        expect(status).to.equal(200);
    });
})
