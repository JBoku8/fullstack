const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// DB Connection

const dbUrl = `mongodb://book_user:b123456@ds149606.mlab.com:49606/books_db`
try {
    if( process.env.ENV === 'Test' ){
        console.log("Test DB");
        const db = mongoose.connect(dbUrl, {useNewUrlParser:true})
    }
    else {
        console.log("Real DB");
        const db = mongoose.connect(dbUrl, {useNewUrlParser:true})
    }
}
catch(err){
    console.log("CATCH",err);
}

const port = process.env.PORT || 4000;
const Book = require('./models/bookModel.js');
const bookRouter = require('./routes/bookRouter.js')(Book);



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api', bookRouter);

app.get('/', (req, res) => {
    return res.send("Demo API");
    // res.sendFile('client/public/index.html');

})

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`)
})

module.exports = app;


