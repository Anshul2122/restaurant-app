const DataUriParser = require('datauri/parser.js');
const path = require('path');

const getDataUri = (file) => {
    if (!file || !file.buffer) {
        throw new Error("Invalid file object");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString(); // Use originalname instead of originalName
    return parser.format(extName, file.buffer);
}

module.exports = { getDataUri };
