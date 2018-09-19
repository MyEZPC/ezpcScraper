var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var casePages;
var caseList = [];
var caseTitle, metadataCase;
var parsedResultsCase = [];

//change page number 
request('https://pcpartpicker.com/products/case/fetch/?page=1&mode=list&xslug=&search=', function (error, response, html){
    if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);

        $('a').each(function (i, element) {
            casePages = $(this).attr('href').replace(/\\"/g, "");
            if (casePages.substring(0, 1) == "/") {
                caseList.push(casePages);
            }
            return caseList;
        })
    }

    //change the i number to 0-50 or 50-100 to avoid captcha
    for (var i = 0; i < 50; i++) {
        console.log("i is " + i + " and the url is " + caseList[i]);
        request('https://pcpartpicker.com' + caseList[i], function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                $('title').each(function (i, element) {
                    caseTitle = $(this).text().split(" (");
                    return caseTitle;
                })

                $('.specs').each(function (i, element) {
                    var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
                    console.log(specs);
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
                    if (specs.includes('Color')) {
                        var q = specs.indexOf('Color');
                        var Color = specs[q + 1];
                    } else { Color = "N/A" }
                    if (specs.includes('Includes Power Supply')) {
                        var q = specs.indexOf('Includes Power Supply');
                        var IncludesPowerSupply = specs[q + 1];
                    } else { IncludesPowerSupply = "N/A" }
                    if (specs.includes('External 2.5" Bays')) {
                        var q = specs.indexOf('External 2.5" Bays');
                        var External2_5Bays = specs[q + 1];
                    } else { External2_5Bays = "N/A" }
                    if (specs.includes('External 3.5" Bays')) {
                        var q = specs.indexOf('External 3.5" Bays');
                        var External3_5Bays = specs[q + 1];
                    } else { External3_5Bays = "N/A" }
                    if (specs.includes('External 5.25" Bays')) {
                        var q = specs.indexOf('External 5.25" Bays');
                        var External5_25Bays = specs[q + 1];
                    } else { External5_25Bays = "N/A" }
                    if (specs.includes('Internal 2.5" Bays')) {
                        var q = specs.indexOf('Internal 2.5" Bays');
                        var Internal2_5Bays = specs[q + 1];
                    } else { Internal2_5Bays = "N/A" }
                    if (specs.includes('Internal 3.5" Bays')) {
                        var q = specs.indexOf('Internal 3.5" Bays');
                        var Internal3_5Bays = specs[q + 1];
                    } else { Internal3_5Bays = "N/A" }
                    if (specs.includes('Internal 5.25" Bays')) {
                        var q = specs.indexOf('Internal 5.25" Bays');
                        var Internal5_25Bays = specs[q + 1];
                    } else { Internal5_25Bays = "N/A" }
                    if (specs.includes('Motherboard Compatibility')) {
                        var q = specs.indexOf('Motherboard Compatibility');
                        var MotherboardCompatibility = specs[q + 1].split(', ');
                    } else { MotherboardCompatibility = "N/A" }
                    if (specs.includes('Front Panel USB 3.0 Ports')) {
                        var q = specs.indexOf('Front Panel USB 3.0 Ports');
                        var FrontPanelUSB3Ports = specs[q + 1];
                    } else { FrontPanelUSB3Ports = "N/A" }
                    if (specs.includes('Maximum Video Card Length')) {
                        var q = specs.indexOf('Maximum Video Card Length');
                        var MaximumVideoCardLength = specs[q + 1].replace('es', 'es,').split(',');
                    } else { MaximumVideoCardLength = "N/A" }
                    if (specs.includes('Dimensions')) {
                        var q = specs.indexOf('Dimensions');
                        var Dimensions = specs[q + 1];
                    } else { Dimensions = "N/A" }
                    metadataCase = {
                        Case: caseTitle[0],
                        Manufacturer: Manufacturer,
                        Model: Model,
                        PartNo: Part,
                        Type: Type,
                        Color: Color,
                        IncludesPowerSupply: IncludesPowerSupply,
                        External2_5Bays: External2_5Bays,
                        External3_5Bays: External3_5Bays,
                        External5_25Bays: External5_25Bays,
                        Internal2_5Bays: Internal2_5Bays,
                        Internal3_5Bays: Internal3_5Bays,
                        Internal5_25Bays: Internal5_25Bays,
                        MotherboardCompatibility: MotherboardCompatibility,
                        FrontPanelUSB3Ports: FrontPanelUSB3Ports,
                        MaximumVideoCardLength: MaximumVideoCardLength,
                        Dimensions: Dimensions
                    }
                    parsedResultsCase.push(metadataCase);
                })
                //change the parsedResultsCase.json name to avoid overwriting previous file ie parsedResultsCase1.1.json
                fs.writeFile('parsedResultsCase1.1.json', JSON.stringify(parsedResultsCase, null, 4), (error) => console.log('File success'))
            } else { console.log(error); }
        })
    }
})


