import path from "path";
import fs from "fs";

// Ort für Quelldateien im JSON-Format
export const externalFileDir: string = path.resolve(path.resolve("./") + "/your_files_here/Polarsteps-Blogs");

// Verzeichnis, in dem die fertige Word-Datei erzeugt wird
export const resultDir: string = "result";
export const resultFilenameUser: string = "MyUserDocument.docx";
export const resultFilenameTrip: string = "MyTripDocument.docx";
export const version = JSON.parse(fs.readFileSync(path.resolve("./") + "/package.json", 'utf-8')).version;
