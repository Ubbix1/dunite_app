const express = require('express');
const multer = require('multer');
const { uploadFile, getFiles, downloadFile } = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Files will be stored in the uploads/ directory

router.post('/upload', upload.single('file'), uploadFile);  // Upload an APK or EXE
router.get('/files', getFiles);                            // Get all file metadata
router.get('/download/:id', downloadFile);                 // Download a file by ID

module.exports = router;
