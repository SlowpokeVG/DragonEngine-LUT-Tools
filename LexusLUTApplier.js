const fs = require("fs");
const path = require("path");
const PNG = require('pngjs').PNG;

let arguments = process.argv.slice(2);
if (arguments.length < 1)
    throw "Not enough arguments. Pass name of the folder with png LUTs and png file with a screenshot without any LUTs."

let folderName = arguments[0];
let fileName = arguments[1];

let screenShotBuffer = fs.readFileSync(fileName);

const screenShotPNG = PNG.sync.read(screenShotBuffer);
let screenShotLUTPNG = PNG.sync.read(screenShotBuffer);
const outPutFolderName = path.join(folderName, "preview");
if (!fs.existsSync(outPutFolderName)){
    fs.mkdirSync(outPutFolderName);
}
fs.readdirSync(folderName).filter(f => !fs.statSync(path.join(folderName, f)).isDirectory()).forEach(file => {
    if (file.indexOf('_prw') == -1) {
        let LUTBuffer = fs.readFileSync(path.join(folderName, file));
        let LUT = PNG.sync.read(LUTBuffer);

        for (let y = 0; y < screenShotPNG.height; y++) {
            for (let x = 0; x < screenShotPNG.width; x++) {
                let idx = (screenShotPNG.width * y + x) << 2;

                let xLUT = Math.floor(screenShotPNG.data[idx + 1] / 16) * 16 + Math.floor(screenShotPNG.data[idx] / 16);
                let yLUT = 15 - Math.floor(screenShotPNG.data[idx + 2] / 16);
                let LUTidx = (256 * yLUT + xLUT) << 2;

                let redRemainder = screenShotPNG.data[idx] % 16;
                let greenRemainder = screenShotPNG.data[idx + 1] % 16;
                let blueRemainder = screenShotPNG.data[idx + 2] % 16;

                let newRed = LUT.data[LUTidx + 2] + redRemainder;
                let newGreen = LUT.data[LUTidx + 1] + greenRemainder;
                let newBlue = LUT.data[LUTidx] + blueRemainder;

                if (newRed < 0) newRed = 0;
                if (newGreen < 0) newGreen = 0;
                if (newBlue < 0) newBlue = 0;

                if (newRed > 255) newRed = 255;
                if (newGreen > 255) newGreen = 255;
                if (newBlue > 255) newBlue = 255;

                screenShotLUTPNG.data[idx] = newRed;
                screenShotLUTPNG.data[idx + 1] = newGreen;
                screenShotLUTPNG.data[idx + 2] = newBlue;

            }
        }

        let LUTtedScreenshotBuffer = PNG.sync.write(screenShotLUTPNG);
        fs.writeFileSync(path.join(outPutFolderName, file), LUTtedScreenshotBuffer);
    }

});
/* convertFile = fs.readFileSync(path.join(folderName, file)).slice(8);
console.log(path.join(folderName, file));
fs.writeFileSync(path.join(folderName, fileName) + ".bmp", bmpHeader);
fs.writeFileSync(path.join(folderName, fileName) + ".bmp", convertFile, { flag: "a" }); */