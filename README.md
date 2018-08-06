# readdirSyncRecursive

Read a directory recursively.

## Install

```bash
npm install readdir-sync-recursive
```

## Usage

```js
// list of directories
const readdirSync = require('readdir-sync-recursive')
const readdirSync('./src');

// with callbacks
const readdirSync = require('readdir-sync-recursive')
const readdirSync('./src', onDir, onFile);

// ingore callback
const readdirSync = require('readdir-sync-recursive')
const readdirSync('./src', null, null, ignoreDir);
```

## API

### readdirSync(dir, onDir, onFile, ignoreDir)

| Param     | Type                                      | Default   | Description                                                    |
| --------- | ----------------------------------------- | --------- | -------------------------------------------------------------- |
| dir       | string                                    |           | directory path                                                 |
| onDir     | (filePath: string): void or any           |           | callback with a directory is found                             |
| onFile    | (filePath: string): void or any           |           | callback with a file is found                                  |
| ignoreDir | ?(filePath: string): boolean or undefined | (): false | function to determine if a file or directory should be ignored |
