const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

const handleParameters = async () => {
  let urlPath = null;
  let outputPath = null;
  let content = null;

  if (argv[2] === '--out') {
    urlPath = argv[4];
    outputPath = argv[3];
    content = await getContent(urlPath);
    writeFile(content, outputPath);
  } else {
    urlPath = argv[2];
    content = await getContent(urlPath);
    console.log(content);
  }
};

const cat = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(`./${path}`, 'utf8', function (err, data) {
      if (err) {
        // handle possible error
        console.error(err.message);
        // kill the process and tell the shell it errored
        process.exit(1);
      }
      // otherwise success
      res(data);
    });
  });
};

const webCat = async (url) => {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    console.log(err.message);
  }
};

const writeFile = (content, outputPath) => {
  fs.writeFile(`./${outputPath}`, content, 'utf8', function (err) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log('Successfully wrote to file!');
  });

  console.log('writing file...');
};

const getContent = (urlPath) => {
  if (urlPath.includes('http')) {
    content = webCat(urlPath);
    return content;
  } else {
    content = cat(urlPath);
    return content;
  }
};

handleParameters();
