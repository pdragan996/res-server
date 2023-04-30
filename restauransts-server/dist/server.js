"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const app_config_1 = require("./app.config");
const app = (0, express_1.default)();
const port = 2222;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('restaurants node app');
});
app.get('/res', (req, res) => {
    res.send({
        mess: 'Some messageesaesea',
        num: 22
    });
});
const client = new mongodb_1.MongoClient(app_config_1.uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        console.log('admin con');
        // Send a ping to confirm a successful connection
        await client.db("restaurants").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const collection = client.db('restaurants').collection('restaurants-list');
        //TODO Radi, prebaciti u drugi fajl
        // await collection.insertOne({
        //   name: 'Nesto tamo',
        //   description: 'test from app'
        // })
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});
console.log('app node exp');
