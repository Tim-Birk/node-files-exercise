const fs = require('fs');

const argv = process.argv;
const path = argv[2];

const cat = (path) => {
  fs.readFile(`./${path}`, 'utf8', function (err, data) {
    if (err) {
      // handle possible error
      console.error(err.message);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    console.log(data);
  });
};

cat(path);
