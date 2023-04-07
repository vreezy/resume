import { compileFromFile } from 'json-schema-to-typescript'
import * as fs from 'fs';
import https from 'https';

// download schema
const schemaJson = fs.createWriteStream("schema.json");
const request = https.get("https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json", function(response) {
   response.pipe(schemaJson);

   // after download completed close filestream
   schemaJson.on("finish", () => {
      schemaJson.close();
      console.log("Download Completed");

      // compile typescript schema from file
      compileFromFile('schema.json')
        .then(ts => fs.writeFileSync('schema.d.ts', ts))
   });
});



