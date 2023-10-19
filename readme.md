# Resume Lars Eschweiler

## Description

[<img alt="Website Deployed for Free with FTP Deploy Action" src="https://img.shields.io/badge/Website deployed for free with-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=2b9348">](https://github.com/SamKirkland/FTP-Deploy-Action)
![example branch parameter.](https://github.com/vreezy/resume/actions/workflows/main.yaml/badge.svg)

based on <https://jsonresume.org/> -> <https://github.com/jsonresume>

this project primary function is to keep my resume.json

extras:

- it can create a typescript schema from resume.json
- Pipeline with test, updateVersion and deploy on my ftp

## install

this will install the resume CLI and all dependencies to create the typescript interface

```bash
npm install
```

## tests

this will validate the resume.json

```bash
npm run test
```

## create schema

it's used by typescript based projects

```bash
npm run build
node getSchema.js
```

donwload schema.json

outputs: schema.d.ts

## updateVersion

used by pipeline

```bash
npm run build
node gitUpdateVersion.js Major Minor Patch
```
