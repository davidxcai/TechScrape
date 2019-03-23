const models = require('../models');

module.exports = {
    index: (req, res) => {
        models.Article.find({})
        .then(articles => {
            res.render('index', {article: articles});
        })
        .catch(err => {
            if (err) console.log(err);
        });
    },
    savedArticles: (req, res) => {
        models.Article.find({saved: true})
        .then(articles => {
            res.render('index', {article: articles});
        })
        .catch(err => {
            if (err) console.log(err);
        })
    }
}