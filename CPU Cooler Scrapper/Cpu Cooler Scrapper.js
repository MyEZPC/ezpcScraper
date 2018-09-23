var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var CpuCoolerPages;
var CpuCoolerList = [];
var CpuCoolerTitle, metadataCpuCooler;
var parsedResultsCpuCooler = [];


//change page number
request('https://pcpartpicker.com/products/cpu-cooler/fetch/?mode=list&xslug=&search=', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('a').each(function (i, element) {
            CpuCoolerPages = $(this).attr('href').replace(/\\"/g, "");
            if (CpuCoolerPages.substring(0, 1) == "/") {
                CpuCoolerList.push(CpuCoolerPages);
            }
            return CpuCoolerList;
        })
    }
    
        //change the i number to 0-50 or 50-100 to avoid captcha
        for (var i = 0; i < 50; i++) {
            console.log("i is " + i + " and the url is " + CpuCoolerList[i]);
            request('https://pcpartpicker.com', function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                $('title').each(function (i, element) {
                    CpuCoolerTitle = $(this).text().split(" (");
                    return CpuCoolerTitle;
                })

                $('.specs').each(function (i, element) {
                    var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
                    if (specs.includes('Manufacturer')){
                        var q = specs.indexOf('Manufacturer');
                        var Manufacturer = specs[q+1];
                    } else {Manufacturer = "N/A"}

                    if (specs.includes('Model')){
                        var q = specs.indexOf('Model');
                        var Model = specs[q+1];
                    } else {Model = "N/A"}

                    if (specs.includes('Part #')) {
                        var q = specs.indexOf('Part #');
                        var Part = specs[q + 1].replace(/\((or)\)/gi, ',').split(", ");
                    } else { Part = "N/A" }

                    if (specs.includes('Supported Sockets')) {
                        var q = specs.indexOf('Supported Sockets');
                        var SupportedSockets = specs[q + 1].split(", ");
                    } else { SupportedSockets = "N/A" }

                    if (specs.includes('Liquid Cooled')) {
                        var q = specs.indexOf('Liquid Cooled');
                        var LiquidCooled = specs[q + 1];
                    } else { LiquidCooled = "N/A" }

                    if (specs.includes('Bearing Type')) {
                        var q = specs.indexOf('Bearing Type');
                        var BearingType = specs[q + 1];
                    } else { BearingType = "N/A" }

                    if (specs.includes('Noise Level')) {
                        var q = specs.indexOf('Noise Level');
                        var NoiseLevel = specs[q + 1];
                    } else { NoiseLevel = "N/A" }
                    
                    if (specs.includes('Fan RPM')) {
                        var q = specs.indexOf('Fan RPM');
                        var FanRPM = specs[q + 1];
                    } else { FanRPM = "N/A" }

                    if (specs.includes('Height')) {
                        var q = specs.indexOf('Height');
                        var Height = specs[q + 1];
                    } else { Height = "N/A" }
                    
                    metadataCpuCooler = {
                        Processsor: CpuCoolerTitle[0],
                        Manufacturer: Manufacturer,
                        Model : Model,
                        Part : Part,
                        SupportedSockets: SupportedSockets,
                        LiquidCooled : LiquidCooled,
                        BearingType : BearingType,
                        NoiseLevel : NoiseLevel,
                        FanRPM : FanRPM,
                        Height : Height,
                    }
                    parsedResultsCpuCooler.push(metadataCpuCooler);
                })
                //change the parsedResultsCpuCooler.json name to avoid overwriting previous file ie parsedResultsCpuCooler1.1.json
                fs.writeFile('parsedResultsCpuCooler1.1.json', JSON.stringify(parsedResultsCpuCooler, null, 4), (error) => console.log('File success'))
            } else { console.log(error); }
        })
    }
})