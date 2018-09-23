
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var RAMPages;
var RAMList = [];
var RAMTitle, metadataRAM;
var parsedResultsRAM = [];

//change page number
request('https://pcpartpicker.com/products/memory/fetch/?mode=list&xslug=&search=', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('a').each(function (i, element) {
            RAMPages = $(this).attr('href').replace(/\\"/g, "");
            if (RAMPages.substring(0, 1) == "/") {
                RAMList.push(RAMPages);
            }
            return RAMList;
        })
    }
  //change the i number to 0-50 or 50-100 to avoid captcha
  for (var i = 0; i < 50; i++) {
    console.log("i is " + i + " and the url is " + RAMList[i]);
    request('https://pcpartpicker.com', function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $('title').each(function (i, element) {
                        RAMTitle = $(this).text().split(" (");
                        return RAMTitle;
                    })

                    $('.specs').each(function (i, element) {
                        var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
                        if (specs.includes('Manufacturer')){
                            var q = specs.indexOf('Manufacturer');
                            var Manufacturer = specs[q+1];
                        } else {Manufacturer = "N/A"}

                        if (specs.includes('Part #')) {
                            var q = specs.indexOf('Part #');
                            var Part = specs[q + 1].replace(/\((or)\)/gi, ',').split(", ");
                        } else { Part = "N/A" }

                        if (specs.includes('Color')) {
                            var q = specs.indexOf('Color');
                            var Color = specs[q + 1].replace(/\//g, ',').split(" , ");
                        } else { Color = "N/A" }

                        if (specs.includes('Type')) {
                            var q = specs.indexOf('Type');
                            var Type = specs[q + 1];
                        } else { Type = "N/A" }

                        if (specs.includes('Speed')) {
                            var q = specs.indexOf('Speed');
                            var memory = specs[q + 1].split("-");
                            var Speed = memory[1];
                        } else { Speed = "N/A" }

                        if (specs.includes('Size')) {
                            var q = specs.indexOf('Size');
                            var Size = specs[q + 1];
                        } else { Size = "N/A" }

                        if (specs.includes('Price/GB')) {
                            var q = specs.indexOf('Price/GB');
                            var PriceGB = specs[q + 1];
                        } else { PriceGB = "N/A" }
                        
                        if (specs.includes('CAS Latency')) {
                            var q = specs.indexOf('CAS Latency');
                            var CASLatency = specs[q + 1];
                        } else { CASLatency = "N/A" }

                        if (specs.includes('Timing')) {
                            var q = specs.indexOf('Timing');
                            var Timing = specs[q + 1];
                        } else { Timing = "N/A" }

                        if (specs.includes('Voltage')) {
                            var q = specs.indexOf('Voltage');
                            var Voltage = specs[q + 1];
                        } else { Voltage = "N/A" }

                        if (specs.includes('Heat Spreader')) {
                            var q = specs.indexOf('Heat Spreader');
                            var HeatSpreader = specs[q + 1];
                        } else { HeatSpreader = "N/A" }

                        if (specs.includes('ECC')) {
                            var q = specs.indexOf('ECC');
                            var ECC = specs[q + 1];
                        } else { ECC = "N/A" }

                        if (specs.includes('Registered')) {
                            var q = specs.indexOf('Registered');
                            var Registered = specs[q + 1];
                        } else { Registered = "N/A" }
                        
                        metadataRAM = {
                            Processsor: RAMTitle[0],
                            Manufacturer: Manufacturer,
                            Part : Part,
                            Color : Color,
                            Type : Type,
                            Speed : {
                                RAMType : memory[0],
                                Frequency : Speed,
                            },
                            Size: Size,
                            PriceGB : PriceGB,
                            CASLatency : CASLatency,
                            Timing : Timing,
                            Voltage : Voltage,
                            HeatSpreader : HeatSpreader,
                            ECC : ECC,
                            Registered : Registered,
                        }
                        parsedResultsRAM.push(metadataRAM);
                    })
                    //change the parsedResultsRAM.json name to avoid overwriting previous file ie parsedResultsRAM1.1.json
                    fs.writeFile('parsedResultsRAM1.1.json', JSON.stringify(parsedResultsRAM, null, 4), (error) => console.log('File success'))
                } else { console.log(error); }
            })
        }
    })