import express from 'express'
import multer from 'multer'
import cors from 'cors'


const app = express();
app.use(cors());


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);

    },
});
const upload = multer({ storage })


app.post('/api/upload', upload.single('avatar'), (req, res) => {
    res.json(req.file);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
 


