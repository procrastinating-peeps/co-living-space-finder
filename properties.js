const express = require('express');
const router = express.Router();
const supabase = require('../db');

router.get('/', async (req, res) => {
  try {
    let query = supabase.from('properties').select('*');

    if (req.query.city) {
      query = query.or(`city.ilike.%${req.query.city}%,area.ilike.%${req.query.city}%`);
    }

    if (req.query.minBudget) {
      query = query.gte('rent', Number(req.query.minBudget));
    }

    if (req.query.maxBudget) {
      query = query.lte('rent', Number(req.query.maxBudget));
    }

    if (req.query.gender && req.query.gender !== 'Any') {
      query = query.or(`gender_preference.eq.${req.query.gender},gender_preference.eq.Any`);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;