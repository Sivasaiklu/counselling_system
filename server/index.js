const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');



const app = express()
app.use(cors())
app.use(express.json())



mongoose.connect('mongodb://localhost:27017/Counselling-System', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db2 = mongoose.connection;
const col2 = db2.collection('register')

db2.on('error', console.error.bind(console, 'MongoDB connection error:'));
db2.once('open', () => {
    console.log('Connected to MongoDB');
});



const client = new MongoClient('mongodb+srv://admin:admin@cluster0.e8408fk.mongodb.net/?retryWrites=true&w=majority')
client.connect()

const db = client.db('counselling')
const col = db.collection('register')


app.post('/register', (req, res) => {
    col.insertOne(req.body);
    col2.insertOne(req.body);
    console.log(req.body);
    res.send("Data Inserted Successfully");

    
})


app.get('/retrive', async (req, res) => {
    const result =await  col.find().toArray()
    console.log(result)
    res.send(result)
})


app.get('/', (req, res)=> {
    res.send('<center><h1>Hello KL University</h1></center>')
})

app.get('/about', (req, res)=>{
    res.send('<h1>This is About Page</h1>')
})

app.get('/contact', (req, res)=>{
    res.send('<h1>This is Contact Page</h1>')
})

app.post('/home', (req, res)=>{
    res.send('<h1>This is Home Page</h1>')
})


app.listen(8080, ()=> {console.log('Express server is running')})

