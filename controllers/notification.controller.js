const Notification = require("../models/Notification");

exports.create = async (req, res) => {
  try {
    const n = await Notification.create(req.body);
    res.json(n);
  } catch (error) {
    res.status(500).json({ error: "Erreur create notif", details: error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Notification.findAll();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Erreur get notif", details: error });
  }
};
