module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.database, {
      useMongoClient: true,
      promiseLibrary: global.Promise
    });
    
    database.on('error', error => console.log(`Connection to Markdown database failed: ${error}`));
    database.on('connected', () => console.log('Connected to Markdown database'));
    database.on('disconnected', () => console.log('Disconnected from Markdown database'));

    process.on('SIGINT', () => {
        database.close(() => {
          process.exit(0);
        })
    });
}