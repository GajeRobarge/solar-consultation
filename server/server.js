const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");


const app = express();
const info = [];
let userInfo = [];
let id = 0;

app.use(bodyparser.json());
app.use(cors());

app.get(`/getInfo`, (req, res) => {
  res.send(`what will you do with your solar savings?`)
})


app.post('/api/submit', (req, res) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        id: id,
        date: new Date().toLocaleDateString(), 
        billSummary: " You will save around $75 by switching to solar! ",

    }
    id = id + 1;

    info.push(data);
    res.send(data);
    
})



app.listen(8080 , ()=>{
    console.log(`Listening on port: 8080`)
});






