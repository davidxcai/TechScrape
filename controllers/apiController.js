const models = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    scrape: (req, res) => {
        console.log(`models: ` + models.Article);
        axios.get("https://www.cnet.com/topics/computers/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("div.asset").each(function (i, element) {
                // Save an empty result object
                var title = $(element).find('div.assetBody').find('h2').text().trim();
                var link = $(element).find('div.assetBody').find('a').attr('href');
                var thumbnail = $(element).find('div.assetThumb').find('.img').children('img').attr('src');
                var summary = $(element).find('div.assetBody').find('p.dek').text().trim();
                if (title && link && thumbnail && summary) {
                    let article = {
                        title: title,
                        link: link,
                        thumbnail: thumbnail,
                        summary: summary,
                        saved: false
                    }
                    console.log(article);
                    models.Article.create(article)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(err => {
                            if (err) console.log(err);
                        });
                }

            })
            res.json({ success: true})
        });
    },
    saveArticle: (req, res) => {
        const articleId = req.params.id;
        const saved = req.body.saved;
        console.log('saved: '+saved)
        models.Article.updateOne({_id: articleId}, {saved: saved})
        .then(result => {
            console.log(result)
            console.log('Successfully saved article' + articleId)
            res.json({ success: true });
        })
        .catch(err => {
            if (err) console.log(err);
        })
    },
    addNote: (req, res) => {
        const articleId = req.params.id;
        const newNote = {
            title: req.body.title,
            body: req.body.body
        }
        models.Note.create(newNote)
        .then(note => models.Article.findOneAndUpdate({_id: articleId}, {$push: {note: note._id}}, {new: true}))
        .then(result => {
            console.log(result);
            res.json({ success: true });
        })
        .catch(err => {
            if (err) console.log(err);
        })
    },
    getNote: (req, res) => {
        const articleId = req.params.id;
        models.Article.findOne({_id: articleId})
        .populate('note')
        .then(notes => {
            res.json(notes);
        })
        .catch(err => {
            if (err) console.log(err);
        });
    },
    deleteNote: (req, res) => {
        const noteId = req.params.id;
        models.Note.deleteOne({_id: noteId})
        .then(result => models.Article.findOneAndUpdate({_id: req.body.articleId}, {$pull: {note: noteId}}))
        .then(result => {
            console.log('Deleted Note: ' + noteId)
            console.log(result)
            res.json({ success: true })
        })
        .catch(err => {
            if (err) console.log(err);
        })
    },
    clear: (req, res) => {
        models.Article.remove({})
        .then(result => models.Note.remove({}))
        .then(result => {
            res.json({ success: true})
        })
        .catch(err => {
            if (err) console.log(err);
        })
    }
}

