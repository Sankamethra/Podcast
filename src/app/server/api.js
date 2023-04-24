
const express = require("express");
const mongo = require("mongodb").MongoClient;
const { Readable } = require('stream');
const { GridFSBucket } = require("mongodb");
const fs = require('fs');
const multer = require('multer');

const router = express.Router();
const app = express();

const upload = multer({ storage: multer.memoryStorage() });

const bodyparser = require("body-parser");
app.use(bodyparser.json({ limit: '50mb' }));

const url = "mongodb://127.0.0.1:27017/";

mongo.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  const db = client.db("temp");
  const bucket = new GridFSBucket(db);

  router.post('/audio', upload.single('audio'), async (req, res) => {
    console.log(req.file);
    const filename = req.file.originalname;
    const contentType = req.file.mimetype;
    const readStream = new Readable();
    readStream.push(req.file.buffer);
    readStream.push(null);
  
    const uploadStream = bucket.openUploadStream(filename, { contentType });
    readStream.pipe(uploadStream);
  
    uploadStream.on('finish', () => {
      console.log(`File ${filename} uploaded to MongoDB GridFS`);
      res.status(200).send(JSON.stringify('Audio file saved successfully'));
    });
  
    uploadStream.on('error', (error) => {
      console.error(error);
      res.status(500).send(JSON.stringify('Error saving audio file'));
    });
  });



  router.get('/listen/:filename', (req, res) => {
    const bucket = new GridFSBucket(db);
    const filename = req.params.filename;

  bucket.find({ filename }).toArray((err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }

    if (files.length === 0) {
      res.status(404).send({ message: 'File not found' });
    }

    const readstream = bucket.openDownloadStreamByName(filename);
    res.set('Content-Type', files[0].contentType);
    res.set('Content-Disposition', `inline; filename="${filename}"`);
    readstream.pipe(res);

  });
});

});
module.exports=router

