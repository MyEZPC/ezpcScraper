var cheerio = require('cheerio');
var request = require('request');
var moboTitle, metadatamobo;

request('https://pcpartpicker.com/product/8sRFf7/asus-rog-strix-z370-e-gaming-atx-lga1151-motherboard-strix-z370-e-gaming', function (error, response, html){
    if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);

        $('title').each(function(i,element){
            moboTitle = $(this).text().split(" (");
            return moboTitle;
        })

        $('.specs').each(function (i,element){
            var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
            var Part = specs[7].replace(/\((or)\)/gi, ',').split(", ");
            // var memory = specs[19].replace("DDR4-", 'DDR4\n') && specs[19].replace(/\//g, ', ').split(", ");
            var memory = specs[19].split("-");
            var memory2 = memory[1].replace(/\//g, ',').split(" , ");
            metadatamobo = {
                MOBO : moboTitle[0],
                Manufacturer : specs[3],
                Model : specs[5],
                Part : Part,
                Color : specs[9],
                FormFactor : specs[11],
                CPUSocket : specs[13],
                Chipset : specs[15],
                MemorySlots : specs[17],
                MemoryType :{
                    type : memory[0],
                    frequency : memory2
                },
                MaxSupportedMemory : specs[21],
                RaidSupport : specs[23],
                OnboardVideo : specs[25],
                CrossfireSupport : specs[27],
                SliSupport : specs[29],
                SATA6gb : specs[31],
                OnboardEthernet : specs[31],
                OnboardUSB3Headers : specs[33],
            }
            return metadatamobo;
        })
        console.log(metadatamobo);
    } else { console.log(error);}
})