'use strict';

import fs from 'fs';

const rawdata = fs.readFileSync('resume.json');
const resume = JSON.parse(rawdata);

if(typeof +process.argv[2] !== "number" && typeof +process.argv[3] !== "number" && typeof +process.argv[4] !== "number") {
  console.error("Please use:'node gitUpdateVersion.js MajorVersion MinorVersion PatchVersion'")
  quit();
}

console.log("current version", resume.meta.version)
console.log("current lastModified", resume.meta.lastModified)

resume.meta.version = `v${process.argv[2]}.${process.argv[3]}.${process.argv[4]}` 
resume.meta.lastModified = new Date().toISOString();

console.log("new version", resume.meta.version)
console.log("nre lastModified", resume.meta.lastModified)

const prettyJSON = JSON.stringify(resume, null, 2)

try {
  fs.writeFileSync('resume.json', prettyJSON);
  // file written successfully
} catch (err) {
  console.error(err);
}