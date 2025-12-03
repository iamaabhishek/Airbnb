const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const hostrouter = require('./routes/hostrouter');

const app = express();


//middleware
app.use(express.urlencoded());

// app.use(userRouter);
// app.use('/host',hostrouter);  // common part of url can be passed as parameter that will prepend 

// app.use((req,res,next)=>{
//     res.status(404).sendFile(path.join(__dirname,"views","Error.html"));
// });   // Run if Page not found 
 
const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust'

main().then(() =>{
    console.log("connect to DB");
}).catch(err =>{
    console.log(err);
})


async function main() {
    await mongoose.connect(MONGO_URL);   
}




app.get("/",(req,res) =>{
    res.send("HII I AM ROOT")
})



const PORT = 3000;

app.listen(PORT,(req,res) =>{
    console.log(`http://localhost:${PORT}`);
});














