const apiController = require('../controllers/apiController');

module.exports = app => {
    app.get("/scrape", apiController.scrape);

    app.put("/article/:id", apiController.saveArticle);

    app.get('/note/:id', apiController.getNote)

    app.post("/note/:id", apiController.addNote);

    app.put("/note/:id", apiController.updateNote)

    app.delete('/note/:id', apiController.deleteNote);

    app.get("/clear", apiController.clear);
}