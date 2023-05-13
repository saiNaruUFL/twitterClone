
const mongoose = require('mongoose');
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