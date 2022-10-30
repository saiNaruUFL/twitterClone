const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  username: String,
  tweetText: String,
  dateTime : String,
  likes: Number,
  retweets: Number,
  comments: [String],
  profileImage: String,
  video: String,
  image: String 
});

module.exports = mongoose.model('Tweet',tweetSchema);