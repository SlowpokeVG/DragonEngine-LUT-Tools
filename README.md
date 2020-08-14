# DragonEngine LUT Tools
A few scripts for usage with Dragon Engine LUTs

# Usage:

# Convert LUTs to BMP:

`cud2bmp.exe '3dlut folder'`

To use next script you need to batch convert bmp files, that script above exported, to png and move them to separate folder.
Alternatively you can download a package that contains pre-converted LUT files and a sample screenshot.


# Apply LUTs to the specific screenshot without any LUTs:

`LexusLUTApplier.exe 'folder with PNG LUT files' 'screenshot'`


# Replace LUTs in all cutscenes in folder with picked LUT:
_It's as simple as 1, 2, 3!_

1.  `DECutsceneLutReplacer.js  'AUTH folder' 'path to Gibbed's PARC Tools' 'path to .cud LUT of your choice'`
1.  `DECutsceneLutReplacer2.js 'AUTH folder' 'path to Gibbed's PARC Tools' 'path to .cud LUT of your choice'`
1.  `DECutsceneLutReplacer3.js 'AUTH folder' 'path to Gibbed's PARC Tools' 'path to .cud LUT of your choice'`
