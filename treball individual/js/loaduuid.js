import { random_uuid } from "../library/uuidlib.js";

if(!localStorage.uuid){
    localStorage.uuid = random_uuid;
}