import {TripParser} from "../trip/TripParser";
import {version} from "./TechnicalConstants";

class App {

    public doWork() {
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