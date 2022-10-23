import fs from 'fs';
import path from "path";
import User from "../domain/User";

const externalFileDir = path.resolve(path.resolve("./") + "/your_files_here/Polarsteps-Blogs");
let userJsonPath = path.resolve(externalFileDir + "/user/user.json");


class App {

    public doWork() {
        console.log("Polarsteps Unpacker v0.0.1");
        console.log("Hello World!");

        readUserData();
    }

}

function readUserData() {
    console.log("Reading User data...")
    let userData = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8')) as User;
    console.log("Username is " + userData.first_name);
    console.log("User living location is " + userData.living_location_name);
}

export default App;