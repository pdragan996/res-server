import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import Mongodb, {MongoClient, ServerApiVersion} from 'mongodb'
import { uri } from './app.config';

const app: Express = express();
const port = 2222;

app.use(cors())

app.get('/', (req: Request, res: Response)=>{
  res.send('restaurants node app');
});

app.get('/res', (req: Request, res: Response)=>{
  res.send({
    mess: 'Some messageesaesea',
    num: 22
  });
});

const client = new MongoClient(uri,  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log('admin con')
    // Send a ping to confirm a successful connection
    await client.db("restaurants").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const collection = client.db('restaurants').collection('restaurants-list');
  //TODO Radi, prebaciti u drugi fajl
    // await collection.insertOne({
    //   name: 'Nesto tamo',
    //   description: 'test from app'
    // })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=> {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});

console.log('app node exp')