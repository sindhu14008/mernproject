// mongodb connection
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// TO CONNECT - whenever we use async and await, we will wrap it in try catch block
const connectDB = async () => {
    try {
      // as it returns a promise we use await
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('MongoDB Connected...');

    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;
