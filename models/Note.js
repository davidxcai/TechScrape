const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var NoteSchema = new Schema({
    body: {
        type: String,
        required: true
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;