const fs = require('fs');
const path = require('path');

const rootFolder = path.join(path.dirname(process.mainModule.filename));

/*
fs --------------------------------------------------

fs.unlink(paht, 'new name', callback) => 

remove the file from the disk
try {
    fs.unlink(path.join(path.dirname(process.mainModule.filename), 'demo.text'), function (err) {
        if (err) {
            console.log('there is no such file');
        } else {
            console.log('done');
        }
    });
} catch (err) {
    console.log(err);
}

----------------------------------------------------
rename the file name
const name = 'learning.text';

fs.rename(path.join(rootFolder, 'demo.text'), name, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('file rename done');
    }
});

The fs.stat() method is used to return information about the given file or directory. It returns an fs.Stat object which has several properties and methods to get details about the file or directory.

fs.stat(path.join(rootFolder, 'learning.text'), function (err, result) {
    if (err) {
        console.log(err);
    }

    const file = result.isFile();
    if (file === true) {
        console.log(result);
    }
});

fs.rename(path.join(rootFolder, 'learning.text'), 'demo.txt', function (err) {
    if (err) {
        console.log(err);
    }
    fs.stat(path.join(rootFolder, 'demo.txt'), function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log(result);
    });
});

fs.open ->
fs.open(paht, flag, [mode], callback) => { your code }
*/
