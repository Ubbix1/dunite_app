const File = require('../models/fileModel');
const path = require('path');

// Upload a file
exports.uploadFile = async (req, res) => {
  try {
    const { file } = req;
    const newFile = new File({
      filename: file.originalname,
      fileType: file.mimetype.includes('android') ? 'apk' : 'exe',
      path: file.path,
    });
    await newFile.save();
    res.status(200).json({ message: 'File uploaded successfully', fileId: newFile._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

// Retrieve file metadata
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
};

// Download file by ID
exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.download(path.resolve(file.path), file.filename);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
};
