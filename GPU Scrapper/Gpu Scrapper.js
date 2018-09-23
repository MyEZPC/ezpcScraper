var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var gpuPages;
var gpuList = [];
var gpuTitle, metadataGPU;
var parsedResultsGPU = [];

//change page number 
request('https://pcpartpicker.com/products/video-card/fetch/?mode=list&xslug=&search=', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('a').each(function (i, element) {
            gpuPages = $(this).attr('href').replace(/\\"/g, "");
            if (gpuPages.substring(0, 1) == "/") {
                gpuList.push(gpuPages);
            }
            return gpuList;
        })
    }

    //change the i number to 0-50 or 50-100 to avoid captcha
    for (var i = 0; i < 50; i++) {
        console.log("i is " + i + " and the url is " + gpuList[i]);
        request('https://pcpartpicker.com' + gpuList[i], function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                $('title').each(function (i, element) {
                gpuTitle = $(this).text().split(" (");
                return gpuTitle;
            })
            //gpu ada split bahgaian part#
            //tgok port2 etc s-video, minihdmi, minidp
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
                    var Color = specs[q + 1];
                } else { Color = "N/A" }
                if (specs.includes('Interface')) {
                    var q = specs.indexOf('Interface');
                    var Interface = specs[q + 1];
                } else { Interface = "N/A" }
                if (specs.includes('Chipset')) {
                    var q = specs.indexOf('Chipset');
                    var Chipset = specs[q + 1];
                } else { Chipset = "N/A" }
                if (specs.includes('Memory Size')) {
                    var q = specs.indexOf('Memory Size');
                    var MemorySize = specs[q + 1];
                } else { MemorySize = "N/A" }
                if (specs.includes('Memory Type')) {
                    var q = specs.indexOf('Memory Type');
                    var MemoryType = specs[q + 1];
                } else { MemoryType = "N/A" }
                if (specs.includes('Core Clock')) {
                    var q = specs.indexOf('Core Clock');
                    var CoreClock = specs[q + 1];
                } else { CoreClock = "N/A" }
                if (specs.includes('Boost Clock')) {
                    var q = specs.indexOf('Boost Clock');
                    var BoostClock = specs[q + 1];
                } else { BoostClock = "N/A" }
                if (specs.includes('TDP')) {
                    var q = specs.indexOf('TDP');
                    var TDP = specs[q + 1];
                } else { TDP = "N/A" }
                if (specs.includes('Fan')) {
                    var q = specs.indexOf('Fan');
                    var Fan = specs[q + 1];
                } else { Fan = "N/A" }
                if (specs.includes('SLI Support')) {
                    var q = specs.indexOf('SLI Support');
                    var SLISupport = specs[q + 1];
                } else { SLISupport = "N/A" }
                if (specs.includes('Crossfire Support')) {
                    var q = specs.indexOf('Crossfire Support');
                    var CrossfireSupport = specs[q + 1];
                } else { CrossfireSupport = "N/A" }
                if (specs.includes('Length')) {
                    var q = specs.indexOf('Length');
                    var Length = specs[q + 1];
                } else { Length = "N/A" }
                if (specs.includes('Supports G-Sync')) {
                    var q = specs.indexOf('Supports G-Sync');
                    var SupportsGsync = specs[q + 1];
                } else { SupportsGsync = "N/A" }
                if (specs.includes('Supports FreeSync')) {
                    var q = specs.indexOf('Supports FreeSync');
                    var SupportFreeSync = specs[q + 1];
                } else { SupportFreeSync = "N/A" }
                if (specs.includes('DVI-D Dual-Link')) {
                    var q = specs.indexOf('DVI-D Dual-Link');
                    var DVIDDualLink = specs[q + 1];
                } else { DVIDDualLink = "N/A" }
                if (specs.includes('DisplayPort')) {
                    var q = specs.indexOf('DisplayPort');
                    var DisplayPort = specs[q + 1];
                } else { DisplayPort = "N/A" }
                if (specs.includes('HDMI')) {
                    var q = specs.indexOf('HDMI');
                    var HDMI = specs[q + 1];
                } else { HDMI = "N/A" }
                metadataGPU = {
                    Processsor: gpuTitle[0],
                    Manufacturer: Manufacturer,
                    Part : Part,
                    Color: Color,   
                    Interface: Interface,
                    Chipset: Chipset,
                    MemorySize: MemorySize,
                    MemoryType: MemoryType,
                    CoreClock: CoreClock ,
                    BoostClock: BoostClock ,
                    TDP : TDP ,
                    Fan : Fan ,
                    SLISupport : SLISupport ,
                    CrossfireSupport : CrossfireSupport ,
                    Length : Length ,
                    SupportsGsync : SupportsGsync ,
                    SupportFreeSync : SupportFreeSync ,
                    DVIDDualLink : DVIDDualLink ,
                    DisplayPort : DisplayPort ,
                    HDMI :HDMI ,

                }
                parsedResultsGPU.push(metadataGPU);
                })
                //change the parsedResultsGPU.json name to avoid overwriting previous file ie parsedResultsGPU1.1.json
                fs.writeFile('parsedResultsGPU1.1.json', JSON.stringify(parsedResultsGPU, null, 4), (error) => console.log('File success'))
            } else { console.log(error); }
        })
    }
})