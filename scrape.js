var cheerio = require('cheerio');
var request = require('request');
var cpuTitle, metadataCPU;

request('https://pcpartpicker.com/product/sxDzK8/intel-core-i7-8700k-37ghz-6-core-processor-bx80684i78700k', function (error, response, html){
    if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);

        $('title').each(function(i,element){
            cpuTitle = $(this).text().split(" (");
            return cpuTitle;
        })

        $('.specs').each(function (i,element){
            var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
            var L1Cache = specs[17].replace(/on/gi , "on,");
            L1Cache = L1Cache.split(",");
            metadataCPU = {
                Processsor : cpuTitle[0],
                Manufacturer : specs[3],
                PartNo : specs[5],
                DataWidth : specs[7],
                Socket : specs[9],
                OperatingFrequency : specs[11],
                MaxTurboFrequency : specs[13],
                Cores : specs[15],
                L1Cache: L1Cache,
                L2Cache : specs[19],
                L3Cache : specs[21],
                Lithography : specs[23],
                ThermalDesignPower : specs[25],
                IncludesCPUCooler : specs[27],
                SimultaneousMultithreading : specs[29],
                MaximumSupportedMemory : specs[31],
                IntegratedGraphics : specs[33]
            }
            return metadataCPU;
        }) 
        console.log(metadataCPU);
    } else { console.log(error);}
})