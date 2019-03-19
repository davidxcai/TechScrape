// const models = require('../models');
const Article = require('../models/Article');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    scrape: (req, res) => {
        console.log(`models: ` + Article);
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
                    Article.create(article)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(err => {
                            if (err) {
                                console.log(err);
                            }
                        });
                }

            });
            res.send("Scrape Complete");
        });
    },
    clear: (req, res) => {
        Article.remove({})
        .then(result => {
            res.json({ success: true })
        })
        .catch(err => {
            if (err) console.log(err);
        })
    }
}

