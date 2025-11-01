import docx, {Paragraph} from "docx";
import {version} from "../app/TechnicalConstants.js";
import {fontType, fontSizeHeading, fontSizeContent} from "../print/FormatConstants.js";
import fs from "fs";
import {Step, Trip} from "./Trip.js";
import {printDocumentToResultDir} from "../print/DocPrinter.js";
import {tripAlaska} from "../app/TripPaths.js";

// Welcher Trip soll gedruckt werden? (Oben aus TripPaths.ts importieren)
const tripToPrintJsonPath = tripAlaska;

export class TripParser {

    public printTripInfo(): void {
        console.log(tripToPrintJsonPath);
        let tripData = JSON.parse(fs.readFileSync(tripToPrintJsonPath, 'utf-8')) as Trip;
        console.log("Found trip data for trip " + "'" + tripData.name + "'");
        console.log("Printing trip data...")

        let map = new Map<number, docx.Paragraph>();
        tripData.all_steps.forEach(step => {
            let stepsFromJson = this.buildTripSectionForStep(step);
            map.set(step.id, stepsFromJson)
        });

        let docParagraphs = Array.from(map, ([id, section]) => (section));

        let doc = new docx.Document({
            sections: [{
                properties: {},
                children: docParagraphs,
                headers: {
                    default: new docx.Header({
                        children: [new docx.Paragraph("Polarsteps Unpacker v" + version)],
                    }),
                }
            }]
        });

        const resultFilename = "MyTrip_" + tripData.name + ".docx";
        printDocumentToResultDir(doc, resultFilename);
    }

    private buildTripSectionForStep(step: Step): docx.Paragraph {
        let paragraph = new docx.Paragraph({});
        paragraph.addChildElement(this.getDateRun(step));
        this.addSpacing(paragraph, 1);

        paragraph.addChildElement(this.getLocationRun(step));
        this.addSpacing(paragraph, 1);

        paragraph.addChildElement(this.getDescriptionRun(step));
        this.addSpacing(paragraph, 2);
        return paragraph;
    }

    private addSpacing(paragraph: Paragraph, spacings: number) {
        paragraph.addChildElement(new docx.TextRun({break: spacings}))
    }

    private getDateRun(step: Step): docx.TextRun {
        return new docx.TextRun({
            text: "Datum: " + this.convertToDateString(step.start_time),
            bold: true,
            size: fontSizeHeading,
            font: fontType
        });
    }

    private getLocationRun(step: Step) {
        return new docx.TextRun({
            text: "Ort: " + step.location.name,
            bold: true,
            size: fontSizeHeading,
            font: fontType
        });
    }

    private getWeatherRun(step: Step) {
        return new docx.TextRun({
            text: "Wetterbedingungen: " + step.weather_condition,
            bold: true,
            size: fontSizeHeading,
            font: fontType
        });
    }

    private getDescriptionRun(step: Step) {
        return new docx.TextRun({
            text: step.description,
            bold: false,
            size: fontSizeContent,
            font: fontType
        });
    }

    private convertToDateString(seconds: number): string {
        // Datum kommt als UNIX-Timestamp
        let secondsRounded = Math.round(seconds);
        let date = new Date(secondsRounded * 1000);
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }

}