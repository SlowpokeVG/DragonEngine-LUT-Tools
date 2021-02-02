const fs = require("fs");
const path = require("path");

let arguments = process.argv.slice(2);
if (arguments.length < 1)
    throw "Not enough arguments. Pass name of the file and '-v2' if you are working with Y7+ LUTs'"

let inputPath = arguments[0];
let version = arguments[1];

const cudHeader = Buffer.from('10000000FFFFFFFF0000', 'hex');
const cudHeader20 = Buffer.from('20000000FFFFFFFF0000', 'hex');

if (fs.lstatSync(inputPath).isDirectory())
fs.readdirSync(inputPath).forEach(file => {
    bmpConvert(path.join(inputPath, file), version);
})
else bmpConvert(inputPath, version);

function bmpConvert(filePath, ver)
{
    if (path.extname(filePath) == '.bmp') {
        convertFile = fs.readFileSync(filePath).slice(56);
        filePath = filePath.slice(0, -4);
        console.log(filePath);
        if (ver == "-v2") fs.writeFileSync(filePath + ".cud", cudHeader20);
        else fs.writeFileSync(filePath + ".cud", cudHeader);
        fs.writeFileSync(filePath + ".cud", convertFile, { flag: "a" });
    }
}