const {lstatSync, readdirSync: fsReaddirSync} = require('fs');
const {join} = require('path');

const isFalse = () => false;

const isDirectory = (file) => lstatSync(file).isDirectory();

const readdirSync = (dir, onDir, onFile, ignoreDir = isFalse) => {
  if (typeof dir !== 'string') {
    return [];
  }

  let dirs;
  try {
    dirs = fsReaddirSync(dir).map(name => join(dir, name)).filter((f) => !ignoreDir(f));
  } catch (error) {
    dirs = [];
  }

  for (let i = 0, length = dirs.length; i < length; i++) {
    const file = dirs[i];
    if (isDirectory(file)) {
      if (typeof onDir === 'function') {
        onDir(file);
      }

      dirs = dirs.concat(...readdirSync(file, onDir, onFile, ignoreDir));
    } else {
      if (typeof onFile === 'function') {
        onFile(file);
      }
    }
  }

  return dirs.filter(isDirectory);
};

module.exports = readdirSync;