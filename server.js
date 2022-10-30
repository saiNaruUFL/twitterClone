const express = require('express');
const  Tweet = require('./model/Tweet');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const connectDB = require('./config/dbConn');
const path = require('path');
const cors = require('cors');
const { response } = require('express');


connectDB();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname,'../public')));

app.get('/',(req,res) => {
  res.sendFile('./public/index.html',{root: __dirname});  
});

app.get('/api/tweets',(req,response) => {
 
  const allTweets = Tweet.find({});

  allTweets
  .then((res) => JSON.stringify(res))
  .then((res) => {
    response.send(res);
  });

});

app.post('/api/tweets',(request,response) => {

  console.log("Request");
  console.log(request.body);
 // const tweetRequstBody = tweetRequst.body;

  const tweet = Tweet.create({
    username : request.body.username,
    tweetText : request.body.tweetText,
    dateTime : request.body.date,
    likes : 0,
    retweets: 0,  
    comments: 0,
  })
  .then((res) => JSON.stringify(res))
  .then((res) => {
    console.log("JSON String");
    console.log(res);
    response.send(res);
  });

});

mongoose.connection.once('open',() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 8000,()=> {
    console.log("Server started on port 8000");
  });  
})
