//modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//db
mongoose
    .connect("mongodb://localhost:27017/markdown", {
        useNewUrlParser: true
    })
    .then(
        () => {
            // eslint-disable-next-line no-console
            console.info("Connected")
        },
        error => {
            // eslint-disable-next-line no-console
            console.info("MongoDB connection error" + error)
        });

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    modified: {
        type: Date,
        default: Date.now
    }
});
          
mongoose.model('Document', Schema);

//middlewares
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin');

    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//business logic
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

//routing
app.get('*', (req, res) =>
    response.status(404).sendStatus('404'));

app.route('/api/documents/add')
    .post(api.create(models.Document));
    
app.route('/api/documents')
    .get(api.index(models.Document));

app.route('/api/documents')
    .post(api.read(models.Document));
    
app.route('/api/documents/update')
    .put(api.signup(models.Document));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`))