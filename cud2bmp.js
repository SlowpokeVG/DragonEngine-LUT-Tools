const fs = require("fs");
const path = require("path");

let arguments = process.argv.slice(2);
if (arguments.length < 1)
    throw "Not enough arguments. Pass name of the folder"

let folderName = arguments[0];
const bmpHeader = Buffer.from('424D36300000000000003600000028000000000100001000000001001800000000000030000000000000000000000000000000000000', 'hex');
const cudHeader = Buffer.from('10000000FFFFFFFF', 'hex');

fs.readdirSync(folderName).forEach(file => {
    if (file.indexOf('cud') != -1) {
        const fileName = path.parse(file).name;
        convertFile = fs.readFileSync(path.join(folderName, file)).slice(8);
        console.log(path.join(folderName, file));
        fs.writeFileSync(path.join(folderName, fileName) + ".bmp", bmpHeader);
        fs.writeFileSync(path.join(folderName, fileName) + ".bmp", convertFile, { flag: "a" });
    }

});