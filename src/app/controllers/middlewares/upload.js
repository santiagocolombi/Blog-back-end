const multer = require('multer');
const path = require('path');

// Configura onde salvar e como nomear os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../../../uploads'));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

module.exports = upload;
