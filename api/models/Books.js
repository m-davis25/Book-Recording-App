const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const BookModel = model('Books', BookSchema);

module.exports = BookModel;