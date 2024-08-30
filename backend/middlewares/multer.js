const multer = require('multer');


const memoryStorage = multer.memoryStorage();

const storage = memoryStorage;

const singleupload = multer({storage}).single('file');
const multiupload = multer({storage}).array("image", 5);

module.exports = {singleupload, multiupload};
