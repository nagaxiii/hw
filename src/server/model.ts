import { Schema, model } from 'mongoose';

const glossarySchema = new Schema({
    english: String,
    german: String
});

let Glossary = model('Glossary', glossarySchema);

export default Glossary;
