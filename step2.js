const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
const urlPath = argv[2];

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

const webCat = async (url) => {
  try {
    const resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.log(err.message);
  }
};

if (urlPath.includes('http')) {
  webCat(urlPath);
} else {
  cat(urlPath);
}
