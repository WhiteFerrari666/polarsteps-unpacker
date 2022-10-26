import {UserParser} from "../user/UserParser";
import fs from "fs";
import path from "path";

class App {

    public doWork() {
        let version = JSON.parse(fs.readFileSync(path.resolve("./") + "/package.json", 'utf-8')).version;
        console.log("Polarsteps Unpacker v" + version);
        console.log("Hello World!");

        createDocument();
    }
}

function createDocument() {
    console.log("Reading User data...")
    new UserParser().printUserInfo();
}

export default App;