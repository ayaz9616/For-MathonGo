const Chapter = require('../models/Chapter');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const redisClient = require('../utils/redisClient');

exports.getChapters = async (req, res) => {
  try {
    const { class: classFilter, unit, status, weakChapters, subject, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (classFilter) filter.class = classFilter;
    if (unit) filter.unit = unit;
    if (status) filter.status = status;
    if (subject) filter.subject = subject;
    if (weakChapters !== undefined) filter.isWeakChapter = weakChapters === 'true';

    const total = await Chapter.countDocuments(filter);
    const chapters = await Chapter.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ total, chapters });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.uploadChapters = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const filePath = path.join(__dirname, '../', req.file.path);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const failed = [];
    for (const chapter of data) {
      try {
        await Chapter.create(chapter);
      } catch (e) {
        failed.push({ chapter, error: e.message });
      }
    }

    await redisClient.del('chapters_cache');
    res.json({ message: 'Upload complete', failed });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
