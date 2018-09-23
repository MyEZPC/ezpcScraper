var cheerio = require('cheerio');
var request = require('request');
var gpuTitle, metadataGPU;

request('https://pcpartpicker.com/product/tJyxFT/evga-geforce-gtx-1060-6gb-sc-gaming-video-card-06g-p4-6163-kr', function (error, response, html){
    if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);

        $('title').each(function(i,element){
            gpuTitle = $(this).text().split(" (");
            return gpuTitle;
        })

        $('.specs').each(function (i,element){
            var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
            metadataGPU = {
                GPU : gpuTitle[0],
                Manufacturer : specs[3],
                PartNo : specs[5],
                Color : specs[7],
                Interface : specs[9],
                Chipset : specs[11],
                MemorySize : specs[13],
                MemoryType : specs[15],
                CoreClock : specs[17],
                BoostClock : specs[19],
                TDP : specs[21],
                Fan : specs[23],
                SliSupport : specs[25],
                CrossfireSupport : specs[27],
                Length : specs[29],
                SupportsGsync : specs[31],
                DVIDDualLink : specs[33],
                DisplayPort : specs[35],
                HDMI : specs[37]
            }
            return metadataGPU;
        })
        console.log(metadataGPU);
    } else { console.log(error);}
})