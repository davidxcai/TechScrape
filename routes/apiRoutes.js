const apiController = require('../controllers/apiController');

module.exports = app => {
    app.get("/scrape", apiController.scrape);

    app.get("/clear", apiController.clear);
}