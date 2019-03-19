const apiController = require('../controllers/apiController');

app.get("/scrape", apiController.scrape);