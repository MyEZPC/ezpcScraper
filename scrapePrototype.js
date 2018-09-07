var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var cpuTitle, metadataCPU;

request('https://pcpartpicker.com/product/LHYWGX/intel-core-i5-8400-28ghz-6-core-processor-bx80684i58400', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var parsedResultsCPU = [];
        $('title').each(function (i, element) {
            cpuTitle = $(this).text().split(" (");
            return cpuTitle;
        })

        $('.specs').each(function (i, element) {
            var list = [];
            var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
            list.push(specs);
            var L1Cache = specs[17].replace(/on/gi, "on,");
            L1Cache = L1Cache.split(",");
            console.log(list);
        })
    } else { console.log(error); }
})