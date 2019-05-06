const mongoose = require('mongoose');
const api = {};

api.create = (Document) => (req, res) => {
    console.log('creating doc...');

    if (!req.body.title || !req.body.content)
        res.json({ success: false, message: 'Please, pass a title and content.' });

    const doc = new Document({
        title: req.body.title,
        content: req.body.content
    });
    
    doc.save(error => {
        if (error)
            throw error;

        res.json({ success: true });
    })
}

api.index = (Document) => (req, res) => {
    Document.find({}, (error, docs) => {
        if (error)
            throw error;

        res.status(200).json(docs);
    })
}

api.read = (Document) => (req, res) => {  
    if (!req.body.id) 
        res.json({ success: false, message: 'Please, pass an identifier.' });

    Document.findById(req.body.id, (error, doc) => {
        if (error)
            throw error;

        res.status(200).json(doc);
    })
}

api.update = (Document) => (req, res) => {
    if (!req.body.id || !req.body.content)
        res.json({ success: false, message: 'Please, pass an identifier and content.' });

    const doc = new Document({
        content: req.body.content
    });
    
    doc.findByIdAndUpdate(req.body.id, doc, (error, doc) => {
        if (error)
            throw error;

        res.json({ success: true });
    })
}

module.exports = api;