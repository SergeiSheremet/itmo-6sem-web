const config = require('/app/config'),
      models = require('/app/setup');

module.exports = (app) => {
    const api = app.app.api.document;
    
    app.get('*', (req, res) =>
        response.status(404).sendStatus('404')
    );

    app.route('/api/documents/add')
        .post(api.create(models.Document));
    
    app.route('/api/documents')
        .get(api.index(models.Document));

    app.route('/api/documents')
        .post(api.read(models.Document));
    
    app.route('/api/documents/update')
        .put(api.signup(models.Document));
}