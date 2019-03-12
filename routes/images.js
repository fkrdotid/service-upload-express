const express = require('express');
const im = require('imagemagick');
const router = express.Router();
const models = require('./../models');
const uuidv1 = require('uuid/v1');
const multer  = require('multer')
const fs = require('fs')
const upload = multer({ dest: 'uploads/' })

/* GET home page. */
router.get('/', function (req, res, next) {
     res.json({
         name : 'google',
         images : 'index.google.com'
     });
});

router.get('/:id', (req, res) => {
    models.file_uploads.findOne({
        where: { uniqueId : req.params.id },
    }).then(result => {
        const img = new Buffer(result.images, 'base64');

        res.writeHead(200, {
            'Content-Type': result.mime,
            'Content-Length': img.length,
            'Cache-Control': 'public, max-age=31557600'
        });
        res.end(img);
        
    }).catch(err => {
        res.json({
            name: 'google',
            images: 'index.google.com'
        });
    })
});

router.post('/', upload.any(), function (req, res, next) {
    let files = req.files.map(async (file) => {
        return new Promise((resolve, reject) => {
            fs.readFile(file.path, (err, data) => {
                models.file_uploads.create({
                    uniqueId: uuidv1(),
                    jsonData: '',
                    mime: file.mimetype,
                    size: file.size,
                    profile_file: '',
                    images: data
                }).then(result => {
                    resolve(result.uniqueId)
                }).catch(err => {
                    reject(err);
                });
            })
        })
        
    })
    Promise.all(files)
    .then(result => {
        let image = {
            code: 200,
            message: 'success upload image',
            data: result
        }
        res.send(image);
    })

    
    
});


module.exports = router;
