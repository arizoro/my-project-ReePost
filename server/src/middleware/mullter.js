import multer from "multer"
import { v4 as uuid} from 'uuid'
import path from "path";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, "assets/images");
  },
  filename: async function (req, file, cb) {
    const hashing = uuid()
    const extname = path.extname(file.originalname)
    cb(null,`${hashing}${extname}`);
  },
});

export const upload = multer({ 
    storage: storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    }
});
