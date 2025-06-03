const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');
const adminAuth = require('../middlewares/adminAuth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cache = require('../middlewares/cache');

router.get('/', cache, chapterController.getChapters);
router.get('/:id', chapterController.getChapterById);
router.post('/', adminAuth, upload.single('file'), chapterController.uploadChapters);

module.exports = router;
