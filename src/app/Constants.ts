import path from "path";
import fs from "fs";

export const externalFileDir: string = path.resolve(path.resolve("./") + "/your_files_here/Polarsteps-Blogs");
export const resultDir: string = "result";
export const resultFilenameUser: string = "MyUserDocument.docx";
export const resultFilenameTrip: string = "MyTripDocument.docx";
export const version = JSON.parse(fs.readFileSync(path.resolve("./") + "/package.json", 'utf-8')).version;
