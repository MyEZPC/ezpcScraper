var cheerio = require('cheerio');
var request = require('request');
var CPUCoolerTitle, metadataCPUCooler;

request('https://pcpartpicker.com/product/hmtCmG/cooler-master-cpu-cooler-rr212e20pkr2', function (error, response, html){
    if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);

        $('title').each(function(i,element){
            CPUCoolerTitle = $(this).text().split(" (");
            return CPUCoolerTitle;
        })

        $('.specs').each(function (i,element){
            var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
            var Part = specs[7].replace("(or) " , ', ').split(",");
            var Sockets = specs[9].split(", ");
            metadataCPUCooler = {
                CPUCooler : CPUCoolerTitle[0],
                Manufacturer : specs[3],
                Model : specs[5],
                Part: Part,
                SupportedSockets : Sockets,
                LiquidCooled : specs[11],
                BearingType : specs[13],
                NoiseLevel : specs[15],
                FanRPM : specs[17],
                Height : specs[19],
            }
            return metadataCPUCooler;
        })
        console.log(metadataCPUCooler);
    } else { console.log(error);}
})