import fs from "fs";
import {resultDir} from "../app/Constants";
import docx from "docx";

const {Document, Packer} = docx;

function createResultDirIfNecessary() :void {
    if (!fs.existsSync(resultDir)) {
        fs.mkdirSync(resultDir);
    }
}

export function printDocumentToResultDir(document: docx.Document, targetFilename: string) :void {
    console.log("Printing new document to " + resultDir + "/" + targetFilename + "...");

    createResultDirIfNecessary();

    Packer.toBuffer(document).then((buffer) => {
        fs.writeFileSync(resultDir + "/" + targetFilename, buffer);
    });

    console.log("Printing done.");
}