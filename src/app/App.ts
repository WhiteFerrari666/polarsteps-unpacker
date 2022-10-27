import {UserParser} from "../user/UserParser";
import fs from "fs";
import path from "path";
import {TripParser} from "../trip/TripParser";

class App {

    public doWork() {
        let version = JSON.parse(fs.readFileSync(path.resolve("./") + "/package.json", 'utf-8')).version;
        console.log("Polarsteps Unpacker v" + version);
        console.log("Hello World!");

        createDocument();
    }
}

function createDocument() {
    // console.log("Checking user data...")
    // new UserParser().printUserInfo();

    console.log("Checking trip data...")
    new TripParser().printTripInfo();
}

export default App;