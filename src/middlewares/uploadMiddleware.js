import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(path.join(__dirname, '..', '..', 'public', 'resumes'));     
        cb(null, path.join(__dirname, '..', '..', 'public', 'resumes'));    
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

export default upload;
