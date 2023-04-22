const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        mongoose.set("strictQuery", false);
        const connected = await mongoose.connect(process.env.MONGO_URI_LOCAL || process.env.MONGO_URI_ATLAS);
        console.log(`Database Connected: ${connected.connection.host}`.rainbow.underline);

    }catch(error){
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB