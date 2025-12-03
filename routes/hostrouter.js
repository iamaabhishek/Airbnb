const express = require('express');

const hostrouter = express.Router();


hostrouter.get('/add-home',(req,res,next) => {
    res.send(`
                <h1> Register you Home Here : </h1>
                 <form action="/host/add-home" method="post">
                    <label for="HomeName"> Home  </label>
                    <input type="text" name="HomeName" >
                    <br><br>
                    <button type="submit"> Submit </button>
                </form>
                
        `);
})


hostrouter.post('/add-home',(req,res,next) => {
    console.log(req.body);
    res.send(`
                <h1> Home Register Successfully </h1>
                <br><br>
                <a href="/"> Back To Home </a>
                
        `);
})




module.exports = hostrouter

