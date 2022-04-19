var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://webapp-mongo:27017');
// const client = new MongoClient('mongodb://0.0.0.0:27017');



/* GET home page. */
router.get('/', async function (req, res, next) {
  let users=[]
  try {
    await client.connect();
    const collection = client.db('test').collection('user');
    users = await collection.find().toArray();
  } catch (error) {
    console.log(error)
  }
  // console.log(JSON.stringify(a))
  res.render('index', { title: 'hello docker2!' + global.port, users });
});
router.get('/user', async function (req, res, next) {
  let name, users = []
  try {
    await client.connect();
    const collection = client.db('test').collection('user');
    name = 'leo' + Math.floor(Math.random() * 10)
    console.log(name)
    await collection.insertOne({ username: name });
  } catch (error) {
    console.log(error)
  }
  // console.log(JSON.stringify(a))
  res.render('index', { title: 'hello docker1!' + global.port + '   ' + name, users });
});


module.exports = router;
