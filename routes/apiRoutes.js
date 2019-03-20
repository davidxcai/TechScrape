const apiController = require('../controllers/apiController');

module.exports = app => {
    app.get("/scrape", apiController.scrape);

    app.put("/save/:id", apiController.save)

    app.get("/clear", apiController.clear);


}