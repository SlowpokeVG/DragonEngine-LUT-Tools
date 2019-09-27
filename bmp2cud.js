const fs = require("fs");
const path = require("path");

let arguments = process.argv.slice(2);
if (arguments.length < 1)
    throw "Not enough arguments. Pass name of the file"

let fileName = arguments[0];
const cudHeader = Buffer.from('10000000FFFFFFFF0000', 'hex');

if (fileName.indexOf('bmp') != -1) 
{
        convertFile = fs.readFileSync(fileName).slice(56);
        console.log(fileName);
        fs.writeFileSync(fileName + ".cud", cudHeader);
        fs.writeFileSync(fileName + ".cud", convertFile, { flag: "a" });
};