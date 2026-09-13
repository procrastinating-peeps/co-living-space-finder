const express = require("express");
const { v4: uuid } = require("uuid");
const db = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", requireAuth, (req, res) => {
  const { property_id, subject, description } = req.body;
  if (!subject) return res.status(400).json({ error: "Subject is required." });

  const id = uuid();
  db.prepare(
    `INSERT INTO complaints (id, user_id, property_id, subject, description, status)
     VALUES (?, ?, ?, ?, ?, 'open')`
  ).run(id, req.user.id, property_id || null, subject, description || "");

  res.status(201).json({ complaint: db.prepare("SELECT * FROM complaints WHERE id = ?").get(id) });
});

router.get("/mine", requireAuth, (req, res) => {
  const rows = db
    .prepare("SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC")
    .all(req.user.id);
  res.json({ complaints: rows });
});

module.exports = router;
