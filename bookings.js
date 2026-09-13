const express = require("express");
const { v4: uuid } = require("uuid");
const db = require("../db");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

// Tenant: send a booking / join request
router.post("/", requireAuth, requireRole("tenant"), (req, res) => {
  const { property_id, message } = req.body;
  const property = db.prepare("SELECT * FROM properties WHERE id = ? AND status = 'approved'").get(property_id);
  if (!property) return res.status(404).json({ error: "Listing not found or not currently accepting requests." });

  const duplicate = db
    .prepare("SELECT id FROM bookings WHERE tenant_id = ? AND property_id = ? AND status = 'pending'")
    .get(req.user.id, property_id);
  if (duplicate) return res.status(409).json({ error: "You already have a pending request for this listing." });

  const id = uuid();
  db.prepare(
    `INSERT INTO bookings (id, tenant_id, property_id, message, status) VALUES (?, ?, ?, ?, 'pending')`
  ).run(id, req.user.id, property_id, message || "");

  res.status(201).json({ booking: db.prepare("SELECT * FROM bookings WHERE id = ?").get(id) });
});

// Tenant: my booking history
router.get("/mine", requireAuth, requireRole("tenant"), (req, res) => {
  const rows = db
    .prepare(
      `SELECT b.*, p.name as property_name, p.city, p.rent
       FROM bookings b JOIN properties p ON p.id = b.property_id
       WHERE b.tenant_id = ? ORDER BY b.created_at DESC`
    )
    .all(req.user.id);
  res.json({ bookings: rows });
});

// Tenant: cancel a pending request
router.delete("/:id", requireAuth, requireRole("tenant"), (req, res) => {
  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(req.params.id);
  if (!booking || booking.tenant_id !== req.user.id) return res.status(404).json({ error: "Request not found." });
  if (booking.status !== "pending") return res.status(400).json({ error: "Only pending requests can be cancelled." });

  db.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").run(booking.id);
  res.json({ ok: true });
});

// Owner: requests for my properties
router.get("/owner/requests", requireAuth, requireRole("owner"), (req, res) => {
  const rows = db
    .prepare(
      `SELECT b.*, u.name as tenant_name, u.email as tenant_email, u.verified as tenant_verified, p.name as property_name
       FROM bookings b
       JOIN properties p ON p.id = b.property_id
       JOIN users u ON u.id = b.tenant_id
       WHERE p.owner_id = ?
       ORDER BY b.created_at DESC`
    )
    .all(req.user.id);
  res.json({ requests: rows });
});

// Owner: approve or reject a request
router.put("/:id/decision", requireAuth, requireRole("owner"), (req, res) => {
  const { decision } = req.body; // "approved" | "rejected"
  if (!["approved", "rejected"].includes(decision)) {
    return res.status(400).json({ error: "Decision must be approved or rejected." });
  }

  const booking = db
    .prepare(
      `SELECT b.*, p.owner_id, p.capacity, p.id as property_id
       FROM bookings b JOIN properties p ON p.id = b.property_id WHERE b.id = ?`
    )
    .get(req.params.id);
  if (!booking || booking.owner_id !== req.user.id) return res.status(404).json({ error: "Request not found." });

  if (decision === "approved") {
    const occupied = db
      .prepare("SELECT COUNT(*) as c FROM bookings WHERE property_id = ? AND status = 'approved'")
      .get(booking.property_id).c;
    if (occupied >= booking.capacity) {
      return res.status(409).json({ error: "This property is already at full capacity." });
    }
  }

  db.prepare("UPDATE bookings SET status = ? WHERE id = ?").run(decision, booking.id);
  res.json({ ok: true });
});

module.exports = router;
