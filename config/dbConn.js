const mongoose = require('mongoose');

const uri = 'mongodb+srv://sainaru:testing123@cluster0.xjujofj.mongodb.net/?retryWrites=true&w=majority';

async function connectDB() {
  try{
    await mongoose.connect(process.env.URI,{
      useUnifiedTopology: true,
      useNewUrlParser : true, 
    });
    console.log("Connected");
  }
  catch(error){
    console.log(error);
  } 
}

module.exports = connectDB