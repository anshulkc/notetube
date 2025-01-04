import express from 'express'
import multer from 'multer'


const app = express();

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
 


