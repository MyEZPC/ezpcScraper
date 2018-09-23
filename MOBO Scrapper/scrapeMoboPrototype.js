var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var moboTitle, metadatamobo;

request('https://pcpartpicker.com/product/8sRFf7/asus-rog-strix-z370-e-gaming-atx-lga1151-motherboard-strix-z370-e-gaming', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var parsedResultsCPU = [];
        $('title').each(function (i, element) {
            moboTitle = $(this).text().split(" (");
            return moboTitle;
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

            if (specs.includes('Color')) {
                var q = specs.indexOf('Color');
                var Color = specs[q + 1].replace(/\//g, ',').split(" , ");
            } else { Color = "N/A" }

            if (specs.includes('Form Factor')) {
                var q = specs.indexOf('Form Factor');
                var FormFactor = specs[q + 1];
            } else { FormFactor = "N/A" }

            if (specs.includes('CPU Socket')) {
                var q = specs.indexOf('CPU Socket');
                var CPUsocket = specs[q + 1];
            } else { CPUsocket = "N/A" }

            if (specs.includes('Chipset')) {
                var q = specs.indexOf('Chipset');
                var Chipset = specs[q + 1];
            } else { Chipset = "N/A" }
            
            if (specs.includes('Memory Slots')) {
                var q = specs.indexOf('Memory Slots');
                var MemorySlots = specs[q + 1];
            } else { MemorySlots = "N/A" }

            if (specs.includes('Memory Type')) {
                var q = specs.indexOf('Memory Type');
                var memory = specs[q + 1].split("-");
                var MemoryType = memory[1].replace(/\//g, ',').split(" , ");
            } else { MemoryType = "N/A" }

            if (specs.includes('Maximum Supported Memory')) {
                var q = specs.indexOf('Maximum Supported Memory');
                var MaxSupportedMemory = specs[q + 1];
            } else { MaxSupportedMemory = "N/A" }

            if (specs.includes('RAID Support')) {
                var q = specs.indexOf('RAID Support');
                var RAIDSupport = specs[q + 1];
            } else { RAIDSupport = "N/A" }

            if (specs.includes('Onboard Video')) {
                var q = specs.indexOf('Onboard Video');
                var OnboardVideo = specs[q + 1];
            } else { OnboardVideo = "N/A" }
            
            if (specs.includes('CrossFire Support')) {
                var q = specs.indexOf('CrossFire Support');
                var CrossfireSupport = specs[q + 1];
            } else { CrossfireSupport = "N/A" }

            if (specs.includes('SLI Support')) {
                var q = specs.indexOf('SLI Support');
                var SLISupport = specs[q + 1];
            } else { SLISupport = "N/A" }
            
            if (specs.includes('SATA 6 Gb/s')) {
                var q = specs.indexOf('SATA 6 Gb/s');
                var SATA6Gb = specs[q + 1];
            } else { SATA6Gb = "N/A" }

            if (specs.includes('Onboard Ethernet')) {
                var q = specs.indexOf('Onboard Ethernet');
                var OnboardEthernet = specs[q + 1].replace("1 x " , '').replace(/\//g, ' Mbps ,').split(",");;
            } else { OnboardEthernet = "N/A" }

            if (specs.includes('Onboard USB 3.0 Header(s)')) {
                var q = specs.indexOf('Onboard USB 3.0 Header(s)');
                var OnboardUSB3Headers = specs[q + 1];
            } else { OnboardUSB3Headers = "N/A" }
            
            metadatamobo = {
                Processsor: moboTitle[0],
                Manufacturer: Manufacturer,
                Model : Model,
                Part : Part,
                Color: Color,
                FormFactor: FormFactor,
                CPUsocket : CPUsocket,
                Chipset: Chipset,
                MemorySlots: MemorySlots,
                MemoryType :{
                    type : memory[0],
                    frequency : MemoryType,
                },
                MaxSupportedMemory: MaxSupportedMemory ,
                RAIDSupport: RAIDSupport ,
                OnboardVideo : OnboardVideo ,
                CrossfireSupport : CrossfireSupport ,
                SLISupport : SLISupport ,
                SATA6Gb : SATA6Gb ,
                OnboardEthernet : OnboardEthernet ,
                OnboardUSB3Headers : OnboardUSB3Headers ,
            }
            //console.log(specs);
            console.log(metadatamobo);
        })
    } else { console.log(error); }
})