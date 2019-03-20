const Article = require('../models/Article');

module.exports = {
    index: (req, res) => {
        Article.find({})
        .then(articles => {
            console.log('time to render');
            res.render('index', {article: articles});
        })
        .catch(err => {
            if (err) console.log(err);
        });
    }
}