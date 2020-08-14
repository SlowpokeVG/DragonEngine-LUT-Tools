const fs = require("fs");
const path = require("path");
const exec = require('child_process').exec;
const rimraf = require('rimraf');

let arguments = process.argv.slice(2);
if (arguments.length < 2)
    throw "Not enough arguments. Pass name of the folder, path to Gibbed parc tools, LUT to use"

let folderName = arguments[0];
let pathGibbed = arguments[1];

fs.readdirSync(folderName).forEach(file => {
    if ((fs.statSync(path.join(folderName, file)).isDirectory())&&(file.indexOf('_unpack') != -1)) 
        if (fs.existsSync(path.join(folderName, file, "cmn_unpack", "cmn.bin"))) {
        
        let pathToPacker = pathGibbed+'\\Gibbed.Yakuza0.Pack.exe "'+path.join(folderName, file, "cmn_unpack")+'" -b';
        let child = exec(pathToPacker);

        child.stdout.on('data', function(data) {
            console.log(data);
        });
        
        child.on('close', function() {
            rimraf.sync(path.join(folderName, file, "cmn_unpack"));
            fs.unlinkSync(path.join(folderName, file, "cmn.par"));
            fs.renameSync(path.join(folderName, file, "cmn_unpack.par"),path.join(folderName, file, "cmn.par"));

            if (!fs.existsSync(path.join(folderName, file, "cmn_unpack.par"))) {
                const fileName = path.parse(file).name;
        
                let pathToPacker = pathGibbed+'\\Gibbed.Yakuza0.Pack.exe "'+path.join(folderName, file)+'" -b';
                let child = exec(pathToPacker);

                child.stdout.on('data', function(data) {
                    console.log(data);
                });
                
                child.on('close', function() {
                    console.log(fileName + ' done');
                    fs.unlinkSync(path.join(folderName, fileName.slice(0, -7)+ ".par"));
                    fs.renameSync(path.join(folderName, fileName + ".par"),path.join(folderName, fileName.slice(0, -7) + ".par"));
                });
            }
        });
    }
}
);
