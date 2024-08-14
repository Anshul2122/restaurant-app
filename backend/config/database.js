const mongoose = require('mongoose');

exports.connectDatebase = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then((con)=>console.log(`Database connected successfully. ${con.connection.host} `))
    .catch((error)=>console.log(error)
    )
}