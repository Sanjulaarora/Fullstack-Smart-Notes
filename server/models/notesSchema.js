const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true,
        unique: true
    }
});

const Notes = mongoose.model('notes', notesSchema);

module.exports = Notes;