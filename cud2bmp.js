const fs = require("fs");
const path = require("path");

let arguments = process.argv.slice(2);
if (arguments.length < 1)
    throw "Not enough arguments. Pass name of the folder"

let inputPath = arguments[0];

const bmpHeader10 = Buffer.from('424D36300000000000003600000028000000000100001000000001001800000000000030000000000000000000000000000000000000', 'hex');
const bmpHeader20 = Buffer.from('424D36300000000000003600000028000000000400002000000001001800000000000030000000000000000000000000000000000000', 'hex');

if (fs.lstatSync(inputPath).isDirectory())
fs.readdirSync(inputPath).forEach(file => {
    cudConvert(path.join(inputPath, file));
})
else cudConvert(inputPath);

function cudConvert(filePath)
{
    if (path.extname(filePath) == '.cud') {
        convertFile = fs.readFileSync(filePath);
        let ver = convertFile[0];
        convertFile = convertFile.slice(8);
        filePath = filePath.slice(0, -4);
        console.log(filePath);
        if (ver == 0x10) fs.writeFileSync(filePath + ".bmp", bmpHeader10);
        else if (ver == 0x20) fs.writeFileSync(filePath + ".bmp", bmpHeader20);
        else throw('Unknown version of CUD' + ver)
        fs.writeFileSync(filePath + ".bmp", convertFile, { flag: "a" });
    }
}
