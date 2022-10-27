import docx, {Paragraph} from "docx";
import path from "path";
import {externalFileDir, resultFilenameTrip} from "../app/Constants";
import fs from "fs";
import {Step, Trip} from "./Trip";
import {printDocumentToResultDir} from "../print/DocPrinter";

const tripJsonPath: string = path.resolve(externalFileDir +
    "/trip/Radtour zu den Lofoten_4936737/trip.json");

export class TripParser {

    public printTripInfo() :void {
        console.log(tripJsonPath);
        let tripData = JSON.parse(fs.readFileSync(tripJsonPath, 'utf-8')) as Trip;
        console.log("Found trip data for trip " + "'" + tripData.name + "'");
        console.log("Printing trip data...")

        let map = new Map<number, Paragraph>();
        tripData.all_steps.forEach(step => {
         let section = this.buildTripSectionForStep(step);
         map.set(step.id, section)
        });

        let paragraphs = Array.from(map, ([id, section]) => (section));

        let doc = new docx.Document({
            sections: [{
                properties: {},
                children: paragraphs,
            }]
        });

        printDocumentToResultDir(doc, resultFilenameTrip);
}

private buildTripSectionForStep(step: Step) :Paragraph {
    let paragraph = new docx.Paragraph({});
    paragraph.addChildElement(new docx.TextRun("Datum: " + this.convertToDateString(step.start_time)));
    paragraph.addChildElement(new docx.TextRun("Ort: " + step.location.name));
    paragraph.addChildElement((new docx.TextRun("Wetterbedingungen: " + step.weather_condition)));
    paragraph.addChildElement(new docx.TextRun("Beschreibung: " + step.description));
    return paragraph;
    }

    private convertToDateString(seconds: number) :string {
        let date = new Date(seconds);
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }
}