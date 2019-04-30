const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// DB Connection

try {
    if( process.env.ENV === 'Test' ){
        console.log("Test DB");
        const db = mongoose.connect('url', {useNewUrlParser:true})
    }
    else {
        console.log("Real DB");
        const db = mongoose.connect('url', {useNewUrlParser:true})
    }
}
catch(err){
    console.log("CATCH",err);
}

const port = process.env.PORT || 4000;
const Book = require('./models/bookModel.js');
const bookRouter = require('./routes/bookRouter.js');


app.use('/api', bookRouter);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/'. (req, res) => {
    res.send("Demo API");
})

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`)
})

module.exports = app;


