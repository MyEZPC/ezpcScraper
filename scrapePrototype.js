var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var cpuTitle, metadataCPU;

request('https://pcpartpicker.com/product/LHYWGX/intel-core-i5-8400-28ghz-6-core-processor-bx80684i58400', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var parsedResultsCPU = [];
        $('title').each(function (i, element) {
            cpuTitle = $(this).text().split(" (");
            return cpuTitle;
        })

        $('.specs').each(function (i, element) {
            var specs = $(this).text().replace(/\s\s+/g, '\n').split("\n");
            if (specs.includes('Manufacturer')){
                var q = specs.indexOf('Manufacturer');
                var Manufacturer = specs[q+1];
            } else {Manufacturer = "N/A"}
            if (specs.includes('Part #')) {
                var q = specs.indexOf('Part #');
                var Part = specs[q + 1];
            } else { Part = "N/A" }
            if (specs.includes('Model')) {
                var q = specs.indexOf('Model');
                var Model = specs[q + 1];
            } else { Model = "N/A" }
            if (specs.includes('Data Width')) {
                var q = specs.indexOf('Data Width');
                var DataWidth = specs[q + 1];
            } else { DataWidth = "N/A" }
            if (specs.includes('Socket')) {
                var q = specs.indexOf('Socket');
                var CPUSocket = specs[q + 1];
            } else { CPUSocket = "N/A" }
            if (specs.includes('Operating Frequency')) {
                var q = specs.indexOf('Operating Frequency');
                var OperatingFrequency = specs[q + 1];
            } else { OperatingFrequency = "N/A" }
            if (specs.includes('Max Turbo Frequency')) {
                var q = specs.indexOf('Max Turbo Frequency');
                var MaxTurboFrequency = specs[q + 1];
            } else { MaxTurboFrequency = "N/A" }
            if (specs.includes('Cores')) {
                var q = specs.indexOf('Cores');
                var Cores = specs[q + 1];
            } else { Cores = "N/A" }
            if (specs.includes('L1 Cache')) {
                var q = specs.indexOf('L1 Cache');
                var L1Cache = specs[q + 1].replace(/on/gi, "on,").split(",");
            } else { L1Cache = "N/A" }
            if (specs.includes('L2 Cache')) {
                var q = specs.indexOf('L2 Cache');
                var L2Cache = specs[q + 1];
            } else { L2Cache = "N/A" }
            if (specs.includes('L3 Cache')) {
                var q = specs.indexOf('L3 Cache');
                var L3Cache = specs[q + 1];
            } else { L3Cache = "N/A" }
            if (specs.includes('Lithography')) {
                var q = specs.indexOf('Lithography');
                var Lithography = specs[q + 1];
            } else { Lithography = "N/A" }
            if (specs.includes('Thermal Design Power')) {
                var q = specs.indexOf('Thermal Design Power');
                var ThermalDesignPower = specs[q + 1];
            } else { ThermalDesignPower = "N/A" }
            if (specs.includes('Includes CPU Cooler')) {
                var q = specs.indexOf('Includes CPU Cooler');
                var IncludesCPUCooler = specs[q + 1];
            } else { IncludesCPUCooler = "N/A" }
            if (specs.includes('Simultaneous Multithreading')) {
                var q = specs.indexOf('Simultaneous Multithreading');
                var SimultaneousMultithreading = specs[q + 1];
            } else { SimultaneousMultithreading = "N/A" }
            if (specs.includes('Maximum Supported Memory')) {
                var q = specs.indexOf('Maximum Supported Memory');
                var MaximumSupportedMemory = specs[q + 1];
            } else { MaximumSupportedMemory = "N/A" }
            if (specs.includes('Integrated Graphics')) {
                var q = specs.indexOf('Integrated Graphics');
                var IntegratedGraphics = specs[q + 1];
            } else { IntegratedGraphics = "N/A" }
            metadataCPU = {
                Processsor: cpuTitle[0],
                Manufacturer: Manufacturer,
                Model : Model,
                PartNo: Part,
                DataWidth: DataWidth,
                Socket: CPUSocket,
                OperatingFrequency: OperatingFrequency,
                MaxTurboFrequency: MaxTurboFrequency,
                Cores: Cores,
                L1Cache: L1Cache,
                L2Cache: L2Cache,
                L3Cache: L3Cache,
                Lithography: Lithography,
                ThermalDesignPower: ThermalDesignPower,
                IncludesCPUCooler: IncludesCPUCooler,
                SimultaneousMultithreading: SimultaneousMultithreading,
                MaximumSupportedMemory: MaximumSupportedMemory,
                IntegratedGraphics: IntegratedGraphics
            }
            console.log(metadataCPU);
        })
    } else { console.log(error); }
})