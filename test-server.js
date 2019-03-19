const axios = require('axios');
const cheerio = require('cheerio');

console.log('grabbing something ffrom reddit!');

axios.get('https://www.indeed.com/jobs?q=software%20developer&l=Alhambra%2C%20CA&advn=9157817822650960').then(response => {

    var $ = cheerio.load(response.data);

    var results = [];
    $('a.jobTitle').each((i, e) => {

        var title = $(e).text();

        // var body = $(e).children().attr('summary');

        results.push({
            title: title,
            // body: link
        });
    });

    console.log(results);
});