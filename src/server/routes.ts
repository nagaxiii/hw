import { Router, Request, Response } from 'express';
import Glossary from './model';

let routes = Router();

export let index = async (req: Request, res: Response) => {
    try {
        const glossaries = await Glossary.find();
        res.send(glossaries);
    } catch (err) {
        res.status(500).send();
    }
};

export let create = async (req: Request, res: Response) => {
    const glossary = new Glossary({
        english: req.body.english,
        german: req.body.german
    });

    try {
        let newGlossary = await glossary.save();
        // TODO: get server uri from config
        res.set({ Location: `http://localhost/api/v1/glossary/${newGlossary.id}` });
        res.status(201).send(newGlossary);
    } catch (err) {
        const validationErrors = err.errors;
        if (validationErrors) {
            let errors = Object.keys(validationErrors).map(key => {
                let error = validationErrors[key];
                return { field: error.path, message: error.message };
            });
            return res.status(400).send(errors);
        }
        res.status(500).send();
    }
};

export let find = async (req: Request, res: Response) => {
    try {
        let glossary = await Glossary.findOne({ _id: req.params.id });

        if (!glossary) {
            return res.status(404).send();
        }

        res.send(glossary);
    } catch (err) {
        res.status(500).send();
    }
};

export let update = async (req: Request, res: Response) => {
    try {
        let glossary = await Glossary.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        if (!glossary) {
            return res.status(404).send();
        }

        res.send(glossary);
    } catch (err) {
        if (err.name === 'CastError') {
            res.status(400).send();
        }
        res.status(500).send();
    }
};

export let destroy = async (req: Request, res: Response) => {
    try {
        let glossary = await Glossary.findOneAndDelete({ _id: req.params.id });
        if (!glossary) {
            return res.status(404).send();
        }
        res.status(204).send(glossary);
    } catch (err) {
        res.status(500).send();
    }
};

export default routes
    .get('/', index)
    .post('/', create)
    .get('/:id', find)
    .put('/:id', update)
    .delete('/:id', destroy);
