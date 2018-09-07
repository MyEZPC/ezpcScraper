var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var cpuPages;
var cpuList = [];
var cpuTitle, metadataCPU;

request('https://pcpartpicker.com/products/cpu/fetch/?page=1&mode=list&xslug=&search=', function (error, response, html){
    if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        
        $('a').each(function(i,element){
            cpuPages = $(this).attr('href').replace(/\\"/g, "");
            if (cpuPages.substring(0, 1) == "/" ){
                cpuList.push(cpuPages);
            }
            return cpuList;
        })
    }

    for (var i = cpuList.length - 1; i > -1; i-- ){
        request('https://pcpartpicker.com' + cpuList[i], function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var parsedResultsCPU = [];
                $('title').each(function (i, element) {
                    cpuTitle = $(this).text().split(" (");
                    return cpuTitle;
                })

                $('.specs').each(function (i, element) {
                    var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
                    var L1Cache = specs[17].replace(/on/gi, "on,");
                    L1Cache = L1Cache.split(",");
                    metadataCPU = {
                        Processsor: cpuTitle[0],
                        Manufacturer: specs[3],
                        PartNo: specs[5],
                        DataWidth: specs[7],
                        Socket: specs[9],
                        OperatingFrequency: specs[11],
                        MaxTurboFrequency: specs[13],
                        Cores: specs[15],
                        L1Cache: L1Cache,
                        L2Cache: specs[19],
                        L3Cache: specs[21],
                        Lithography: specs[23],
                        ThermalDesignPower: specs[25],
                        IncludesCPUCooler: specs[27],
                        SimultaneousMultithreading: specs[29],
                        MaximumSupportedMemory: specs[31],
                        IntegratedGraphics: specs[33]
                    }
                    parsedResultsCPU.push(metadataCPU);
                })
                fs.writeFile('parsedResultsCPU.json', JSON.stringify(parsedResultsCPU, null, 4), (error) => console.log('File success'))
                console.log(parsedResultsCPU);
            } else { console.log(error); }
        })
    }
        
})
