const fs = require("fs/promises");
const path = require("path");

const Jimp = require("jimp")

const renameUploadFile = async (file, resultDir) => {
    const {path: tempUpload, filename} = file;
    const resultUpload = path.join(resultDir, filename);
    
    Jimp.read(tempUpload)
    .then((image) => {
      image.resize(250, 250);
      image.write(resultUpload);
    })
    .catch((err) => {
      throw new Error(err);
    });

    await fs.rename(tempUpload, resultUpload);
}

module.exports = renameUploadFile;