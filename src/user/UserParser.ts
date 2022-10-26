import path from "path";
import fs from "fs";
import User from "./User";
import docx from "docx";
import {externalFileDir, resultDir, resultFilename} from "../app/Constants";

const {Document, Packer, Paragraph, TextRun} = docx;
const userJsonPath: string = path.resolve(externalFileDir + "/user/user.json");

export class UserParser {

    public printUserInfo() :void {
        let userData = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8')) as User;
        console.log("Username is " + userData.first_name);
        console.log("User living location is " + userData.living_location_name);
        console.log("Printing document...");
        const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(userData.first_name)
                                ]
                            }),
                            new Paragraph({
                                children: [],
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "\n" + userData.living_location_name,
                                        bold: true,
                                        italics: true
                                    })
                                ]
                            })
                        ]
                    }
                ]
            }
        )

        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir);
        }

        Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync(resultDir + "/" + resultFilename, buffer);
        });
        console.log("Printing done.");
    }

}


