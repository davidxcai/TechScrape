const htmlController = require('../controllers/htmlController');

module.exports = app => {
    app.get('/', htmlController.index);
}