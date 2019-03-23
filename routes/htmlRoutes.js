const htmlController = require('../controllers/htmlController');

module.exports = app => {
    app.get('/', htmlController.index);

    app.get('/articles/saved', htmlController.savedArticles)
}