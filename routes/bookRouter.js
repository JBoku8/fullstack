const express = require('express');
const bookController = require('../controllers/booksController')

function routes(Book){
    const bookRouter = new express.Router();
    const controller = bookController(Book);
    
    bookRouter.route('/books')
    .get(controller.get)
    .post(controller.post);


    bookRouter.use('/books/:id', (req, res, next) => {
        Book.findById(req.params.id, (err, book) => {
            if(err){
                return res.send(err);
            }
            if( book ){
                req.book = book;
                return next();
            }
            return res.sendStatus(404);
        })
    })

    bookRouter.route('/books/:id')
    .get( (req, res) => {
        const book = req.book.toJSON();
        book.links = {};
        const genre = req.book.genre.replace(" ", "%20");
        book.links.filterBy = `http://${req.headers.host}/api/books/?genre=${genre}`;
        return res.json(book);
    })
    .put( (req, res) => {
        const book = { req }
        
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre  = req.body.genre;
        book.read = req.body.read;

        
        req.book.update( (err) => {
            if( err ) {
                return res.send(err);
            }

            return res.send(req.book.toJSON());
        });
    })
    .delete(( req, res) => {
        req.book.remove(err => {
            if( err ){
                return res.send(err);
            }
            return res.sendStatus(204);
        })
    })


    return bookRouter;
}

module.exports = routes;