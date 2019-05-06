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
            console.info("Connected")
        },
        error => {
            console.info("MongoDB connection error" + error)
        });


const DocumentSchema = mongoose.Schema({
    title: String,
    content: String
});
          
const Document = mongoose.model('Document', DocumentSchema);

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
api = {}

api.create = () => (req, res) => {
    console.log("c");
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

api.index = () => (req, res) => {
    console.log("i");

    Document.find({}, (error, docs) => {
        if (error)
            throw error;

        res.status(200).json(docs);
    })
}

api.read = () => (req, res) => {  
    console.log("r");

    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) 
        res.json({ success: false, message: 'Please, pass an identifier.' });

    Document.findById(req.params.id, (error, doc) => {
        if (error)
            throw error;

        res.status(200).json(doc);
    })
}

api.update = () => (req, res) => {
    console.log("u");

    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id) || !req.body.content)
        res.json({ success: false, message: 'Please, pass an identifier and content.' });

    const doc = new Document({
        _id: req.params.id,
        content: req.body.content
    });
    
    Document.findByIdAndUpdate(req.params.id, doc, (error, doc) => {
        if (error)
            throw error;

        res.json({ success: true });
    })
}

//routing
app.route('/api/documents/add')
    .post(api.create());
    
app.route('/api/documents')
    .get(api.index());

app.route('/api/documents/:id')
    .get(api.read());
    
app.route('/api/documents/update/:id')
    .put(api.update());

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`))