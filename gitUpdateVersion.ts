"use strict";

import fs from "fs";
import { exit } from "process";

if (
  typeof +process.argv[2] !== "number" &&
  typeof +process.argv[3] !== "number" &&
  typeof +process.argv[4] !== "number"
) {
  console.error(
    "Please use:'node gitUpdateVersion.js MajorVersion MinorVersion PatchVersion'"
  );
  exit();
}

const files = [
  {
    fileName: "resume.json",
    paths: [
      {
        path: "meta.version",
        data: `v${process.argv[2]}.${process.argv[3]}.${process.argv[4]}`,
      },
      {
        path: "meta.lastModified",
        data: new Date().toISOString(),
      },
    ],
  },
  {
    fileName: "package.json",
    paths: [
      {
        path: "version",
        data: `${process.argv[2]}.${process.argv[3]}.${process.argv[4]}`,
      },
    ],
  },
];

function updateKeyRecursive(
  data: string,
  obj: object,
  pathToFind: string,
  lastPathArr: string[]
) {
  Object.keys(obj).forEach((key) => {
    const currentPathArr = [...lastPathArr, key];

    if (currentPathArr.join(".") === pathToFind) {
      (obj[key as keyof typeof obj] as string) = data;
    } else {
      if (typeof obj[key as keyof typeof obj] === "object") {
        updateKeyRecursive(
          data,
          obj[key as keyof typeof obj],
          pathToFind,
          currentPathArr
        );
      }
    }
  });
}

function getKeyRecursive(
  obj: object,
  pathToFind: string,
  lastPathArr: string[]
): string | null {
  const findings: (string | null)[] = [];

  Object.keys(obj).forEach((key, index) => {
    const currentPathArr = [...lastPathArr, key];

    if (currentPathArr.join(".") === pathToFind) {
      findings.push(obj[key as keyof typeof obj]);
    } else {
      if (typeof obj[key as keyof typeof obj] === "object") {
        findings.push(getKeyRecursive(
          obj[key as keyof typeof obj],
          pathToFind,
          currentPathArr
        ));
      }
    }
  });
  const arr = findings.filter(ele => ele)
  if(arr.length > 0) {
    return arr[0];
  }

  return null;
}

function updatePath(obj: object, path: string, data: string) {
  let currentData = getKeyRecursive(obj, path, []);
  if (currentData) {
    console.log(`current path ${path} data:`, currentData);
  } else {
    console.log(`current path ${path} has no data`);
  }

  updateKeyRecursive(data, obj, path, []);

  console.log(`new path ${path} data:`, data);
}

function readFile(fileName: string) {
  const buffer = fs.readFileSync(fileName);
  return JSON.parse(buffer.toString());
}

function writeFile(fileName: string, obj: object) {
  try {
    const buffer = Buffer.from(JSON.stringify(obj, null, 2));
    fs.writeFileSync(fileName, buffer);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

function main() {
  files.forEach((file) => {
    const obj = readFile(file.fileName);

    file.paths.forEach((path) => {
      updatePath(obj, path.path, path.data);
    });

    writeFile(file.fileName, obj);
  });
}

main();