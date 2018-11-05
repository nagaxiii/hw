import { Schema, model } from 'mongoose';

const glossarySchema = new Schema({
    english: {
        type: String,
        required: 'English part of the entry is required.'
    },
    german: {
        type: String,
        required: 'German part of the entry is required.'
    }
});

let glossary = model('Glossary', glossarySchema);

export default glossary;
