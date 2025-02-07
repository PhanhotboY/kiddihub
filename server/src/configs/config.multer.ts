import fs from 'fs';
import multer from 'multer';
import slugify from 'slugify';

const UPLOAD_FOLDER = 'public/uploads';

const UPLOAD_SIZE_LIMIT = 5 * 1024 * 1024;

const diskStorage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(UPLOAD_FOLDER)) {
        fs.mkdirSync(UPLOAD_FOLDER);
      }
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${slugify(file.originalname)}`);
    },
  }),
  // limits: { fileSize: UPLOAD_SIZE_LIMIT },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
  preservePath: true,
});

const memoryStorage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: UPLOAD_SIZE_LIMIT },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
});

export { diskStorage, memoryStorage };
