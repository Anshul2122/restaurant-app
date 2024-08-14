const app = require("./app");

const { connectDatebase} = require('./config/database');

connectDatebase();

app.listen(process.env.PORT,()=>{
    console.log(`server listening on port ${process.env.PORT}`);
    
})