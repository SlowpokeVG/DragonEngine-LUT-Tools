const fs = require("fs");
const path = require("path");

let arguments = process.argv.slice(2);
if (arguments.length < 3)
    throw "Not enough arguments. Pass name of the folder, path to Gibbed parc tools, LUT to use"

let folderName = arguments[0];
let pathGibbed = arguments[1]; //To keep launching parameters same in all 3 scripts
let pathLUT = arguments[2];

let replacementLUT = fs.readFileSync(pathLUT).slice(8,0x3008);

fs.readdirSync(folderName).forEach(file => {
    if ((fs.statSync(path.join(folderName, file)).isDirectory())&&(file.indexOf('_unpack') != -1)) {
        let cmnBinPath = path.join(folderName, file, "cmn_unpack", "cmn.bin");
        if (fs.existsSync(cmnBinPath)) {
            let cmnPosition = 0;
            cmnFile = fs.readFileSync(cmnBinPath);
            console.log(file)
            const headerLUT = Buffer.from('2833444C757429', 'hex'); // "(3DLut)"
            while (cmnFile.indexOf(headerLUT, cmnPosition + 0xBA) != -1){
                cmnPosition = cmnFile.indexOf(headerLUT, cmnPosition + 0xBA);
                replacementLUT.copy(cmnFile,cmnPosition + 0xBA);
            }
            fs.writeFileSync(cmnBinPath, cmnFile);
        }
    }
}
);