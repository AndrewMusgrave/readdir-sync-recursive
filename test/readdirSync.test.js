const readdirSync = require('../');

const files = [
  'test\\fixtures\\a\\a.js',
  'test\\fixtures\\b\\c\\c.js',
  'test\\fixtures\\b\\c\\d\\f\\f.js',
];

const directories = [
  'test\\fixtures\\a',
  'test\\fixtures\\b',
  'test\\fixtures\\b\\c',
  'test\\fixtures\\b\\c\\d',
  'test\\fixtures\\b\\c\\e',
  'test\\fixtures\\b\\c\\d\\f'
];

describe('readdirSync', () => {
  describe('dir', () => {
    it('will return an emptry array if no arguments are provided', () => {
      const dirs = readdirSync();
      expect(dirs).toEqual([]);
    });

    it('will return an empty array if dir is not of type string', () => {
      const dirs = readdirSync(null);
      expect(dirs).toEqual([]);
    });

    it('will return an empty array if no such file or directory exists', () => {
      const dirs = readdirSync('.\\false\\path');
      expect(dirs).toEqual([]);          
    });
  });

  describe('onDir', () => {
    it('will call onDir with the dir path', () => {
      const spy = jest.fn();
      const dirs = readdirSync('.\\test\\fixtures', spy);
      expect(spy).toBeCalledWith(directories[0]);
      expect(spy).toBeCalledWith(directories[1]);
      expect(spy).toBeCalledWith(directories[2]);
      expect(spy).toBeCalledWith(directories[3]);
      expect(spy).toBeCalledWith(directories[4]);
      expect(spy).toBeCalledWith(directories[5]);      
    });

    it('can have a value of null for onDir', () => {
      const dirs = readdirSync('.\\test\\fixtures', null);
      expect(dirs).toEqual(directories);
    });
  });

  describe('onFile', () => {
    it('will call onFile with the file path', () => {
      const spy = jest.fn();
      const dirs = readdirSync('.\\test\\fixtures', null, spy);
      expect(spy).toBeCalledWith(files[0]);
      expect(spy).toBeCalledWith(files[1]);
      expect(spy).toBeCalledWith(files[2]);  
    });

    it('can have a value of null for onFile', () => {
      const dirs = readdirSync('.\\test\\fixtures', null, null);
      expect(dirs).toEqual(directories);
    });
  });

  describe('ignoreDir', () => {
    it('will not ignore files or directories by default', () => {
      const directorySpy = jest.fn();
      const fileSpy = jest.fn();
      const dirs = readdirSync('.\\test\\fixtures', directorySpy, fileSpy);
      expect(directorySpy).toHaveBeenCalledTimes(6);
      expect(fileSpy).toHaveBeenCalledTimes(3);      
    });

    it('will filter directories and files based on the callback', () => {
      const spy = jest.fn();
      const ignoreDir = (filePath) => filePath.includes('a.js');
      const dirs = readdirSync('.\\test\\fixtures', null, spy, ignoreDir);
      expect(spy).not.toBeCalledWith(files[0]);
    });
  });
});