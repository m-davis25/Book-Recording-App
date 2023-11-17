const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = (process.env.PORT);
const Books = require('./models/Books');
const app = express();

mongoose.connect(process.env.MONGO_DB);
app.use(cors());
app.use(express.json());

app.post('/books', async (req, res) => {
    try{
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author, 
            publishYear: req.body.publishYear
        }
        const book = await Books.create(newBook);
        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

app.get('/books', async (req, res) => {
    try {
        const books = await Books.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

app.get('/books/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const book = await Books.findById(id);

        return res.status(200).json(book);
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

app.put('/books/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }
        
        const { id } = req.params;
        const result = await Books.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book updated sucessfully'});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Books.findByIdAndDelete(id);
        if (!result){
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book deleted sucessfully'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
});