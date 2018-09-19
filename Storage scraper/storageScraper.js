var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var storagePages;
var storageList = [];
var storageTitle, metadataStorage;
var parsedResultsStorage = [];

//change page number 
request('https://pcpartpicker.com/products/internal-hard-drive/fetch/?page=1&mode=list&xslug=&search=', function (error, response, html){
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('a').each(function (i, element) {
            storagePages = $(this).attr('href').replace(/\\"/g, "");
            if (storagePages.substring(0, 1) == "/") {
                storageList.push(storagePages);
            }
            return storageList;
        })
    }

    //change the i number to 0-50 or 50-100 to avoid captcha
    for (var i = 0; i < 50; i++) {
        console.log("i is " + i + " and the url is " + storageList[i]);
        request('https://pcpartpicker.com' + storageList[i], function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                $('title').each(function (i, element) {
                    storageTitle = $(this).text().split(" (");
                    return storageTitle;
                })

                $('.specs').each(function (i, element) {
                    var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
                    if (specs.includes('Manufacturer')) {
                        var q = specs.indexOf('Manufacturer');
                        var Manufacturer = specs[q + 1];
                    } else { Manufacturer = "N/A" }
                    if (specs.includes('Part #')) {
                        var q = specs.indexOf('Part #');
                        var Part = specs[q + 1];
                    } else { Part = "N/A" }
                    if (specs.includes('Capacity')) {
                        var q = specs.indexOf('Capacity');
                        var Capacity = specs[q + 1];
                    } else { Capacity = "N/A" }
                    if (specs.includes('Interface')) {
                        var q = specs.indexOf('Interface');
                        var Interface = specs[q + 1];
                    } else { Interface = "N/A" }
                    if (specs.includes('Form Factor')) {
                        var q = specs.indexOf('Form Factor');
                        var FormFactor = specs[q + 1];
                    } else { FormFactor = "N/A" }
                    if (specs.includes('NAND Flash Type')) {
                        var q = specs.indexOf('NAND Flash Type');
                        var NandFlashType = specs[q + 1];
                    } else { NandFlashType = "N/A" }
                    if (specs.includes('Cache')) {
                        var q = specs.indexOf('Cache');
                        var Cache = specs[q + 1];
                    } else { Cache = "N/A" }
                    if (specs.includes('RPM')) {
                        var q = specs.indexOf('RPM');
                        var RPM = specs[q + 1];
                    } else { RPM = "N/A" }
                    if (specs.includes('GB/$1.00')) {
                        var q = specs.indexOf('GB/$1.00');
                        var GBper1dollar = specs[q + 1];
                    } else { GBper1dollar = "N/A" }
                    if (specs.includes('Price/GB')) {
                        var q = specs.indexOf('Price/GB');
                        var PriceperGB = specs[q + 1];
                    } else { PriceperGB = "N/A" }
                    metadataStorage = {
                        Storage: storageTitle[0],
                        Manufacturer: Manufacturer,
                        PartNo: Part,
                        Capacity: Capacity,
                        Interface: Interface,
                        FormFactor: FormFactor,
                        NandFlashType: NandFlashType,
                        Cache: Cache,
                        RPM: RPM,
                        GBper1dollar: GBper1dollar,
                        PriceperGB: PriceperGB
                    }
                    parsedResultsStorage.push(metadataStorage);
                })
                //change the parsedResultsStorage.json name to avoid overwriting previous file ie parsedResultsStorage1.1.json
                fs.writeFile('parsedResultsStorage1.1.json', JSON.stringify(parsedResultsStorage, null, 4), (error) => console.log('File success'))
            } else { console.log(error); }
        })
    }
})

