import multer from "multer"
import bcrypt from 'bcrypt'
import path from "path";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    console.log(file)
    console.log({request : file.filename})

    await cb(null, "src/public/images");
  },
  filename: async function (req, file, cb) {
    console.log({request : req.file})
    console.log(file)
    const hashing = await bcrypt.hash(file.originalname, 10)
    const extname = path.extname(file.originalname)
    cb(null,`${hashing}${extname}`);
  },
});

export const upload = await multer({ 
    storage: storage,
    limits : {
        fileSize : 4 * 1000 * 1000
    }
});
