import { compileFromFile } from "json-schema-to-typescript";
import * as fs from "fs";
import https from "https";

fs.readFile('./resume.json', (err, buffer) => {
  if (err) throw err;
  const resume = JSON.parse(buffer.toString());
  const schemaJson = fs.createWriteStream("schema.json");
  https.get(
    resume.$schema,
    function (response) {
      response.pipe(schemaJson);

      // after download completed close filestream
      schemaJson.on("finish", () => {
        schemaJson.close();

        // compile typescript schema from file
        compileFromFile("schema.json").then((ts) =>
          fs.writeFileSync("schema.d.ts", ts)
        );
      });
    }
  );
});

