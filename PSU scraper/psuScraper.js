var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var psuPages;
var psuList = [];
var psuTitle, metadataPSU;
var parsedResultsPSU = [];

request('https://pcpartpicker.com/products/power-supply/fetch/?page=1&mode=list&xslug=&search=', function (error, response, html){
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('a').each(function (i, element) {
            psuPages = $(this).attr('href').replace(/\\"/g, "");
            if (psuPages.substring(0, 1) == "/") {
                psuList.push(psuPages);
            }
            return psuList;
        })
    }

    for (var i = 0; i < 50; i++) {
        console.log("i is " + i + " and the url is " + storageList[i]);
        request('https://pcpartpicker.com' + psuList[i], function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                $('title').each(function (i, element) {
                    psuTitle = $(this).text().split(" (");
                    return psuTitle;
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
                    if (specs.includes('Model')) {
                        var q = specs.indexOf('Model');
                        var Model = specs[q + 1];
                    } else { Model = "N/A" }
                    if (specs.includes('Type')) {
                        var q = specs.indexOf('Type');
                        var Type = specs[q + 1];
                    } else { Type = "N/A" }
                    if (specs.includes('Wattage')) {
                        var q = specs.indexOf('Wattage');
                        var Wattage = specs[q + 1];
                    } else { Wattage = "N/A" }
                    if (specs.includes('Modular')) {
                        var q = specs.indexOf('Modular');
                        var Modular = specs[q + 1];
                    } else { Modular = "N/A" }
                    if (specs.includes('Efficiency Certification')) {
                        var q = specs.indexOf('Efficiency Certification');
                        var EfficiencyCertification = specs[q + 1];
                    } else { EfficiencyCertification = "N/A" }
                    if (specs.includes('Efficiency')) {
                        var q = specs.indexOf('Efficiency');
                        var Efficiency = specs[q + 1];
                    } else { Efficiency = "N/A" }
                    if (specs.includes('Output')) {
                        var q = specs.indexOf('Output');
                        var Output = specs[q + 1].split(", ");
                    } else { Output = "N/A" }
                    if (specs.includes('PCI-Express 6+2-Pin Connectors')) {
                        var q = specs.indexOf('PCI-Express 6+2-Pin Connectors');
                        var PCIE6plus2PinConnectors = specs[q + 1];
                    } else { PCIE6plus2PinConnectors = "N/A" }
                    if (specs.includes('PCI-Express 6-Pin Connectors')) {
                        var q = specs.indexOf('PCI-Express 6-Pin Connectors');
                        var PCIE6PinConnectors = specs[q + 1];
                    } else { PCIE6PinConnectors = "N/A" }
                    metadataPSU = {
                        PowerSupply: psuTitle[0],
                        Manufacturer: Manufacturer,
                        Model: Model,
                        PartNo: Part,
                        Type: Type,
                        Wattage: Wattage,
                        Modular: Modular,
                        EfficiencyCertification: EfficiencyCertification,
                        Efficiency: Efficiency,
                        Output: Output,
                        PCIE6plus2PinConnectors: PCIE6plus2PinConnectors,
                        PCIE6PinConnectors: PCIE6PinConnectors,
                    }
                    parsedResultsPSU.push(metadataPSU);
                })
                //change the parsedResultsCPU.json name to avoid overwriting previous file ie parsedResultsCPU1.1.json
                fs.writeFile('parsedResultsPSU1.1.json', JSON.stringify(parsedResultsPSU, null, 4), (error) => console.log('File success'))
            } else { console.log(error); }
        })
    }
})
