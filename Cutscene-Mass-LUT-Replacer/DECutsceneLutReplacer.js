const fs = require("fs");
const path = require("path");
const exec = require('child_process').exec;

let arguments = process.argv.slice(2);
if (arguments.length < 2)
    throw "Not enough arguments. Pass name of the folder, path to Gibbed parc tools, LUT to use"

let folderName = arguments[0];
let pathGibbed = arguments[1];

fs.readdirSync(folderName).forEach(file => {
    if (path.extname(file) == '.par') {
        const fileName = path.parse(file).name;

        let pathToUnpacker = pathGibbed+'\\Gibbed.Yakuza0.Unpack.exe "'+path.join(folderName, file)+'"';
        let child = exec(pathToUnpacker);

        child.stdout.on('data', function(data) {
            console.log(data);
        });
        
        child.on('close', function() {
            console.log(fileName + ' done');
            let cmnPath = path.join(folderName, fileName + "_unpack", "cmn.par");
            console.log(cmnPath);
            if (fs.existsSync(cmnPath)) {
                const fileName = path.parse(file).name;

                let pathToUnpacker = pathGibbed+'\\Gibbed.Yakuza0.Unpack.exe "'+cmnPath+'"';
                let child = exec(pathToUnpacker);

                child.stdout.on('data', function(data) {
                    console.log(data);
                });
                
                child.on('close', function() {
                    console.log(fileName + ' done');
                });
            }
        });
    }
}
);
