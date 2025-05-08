const Signature = require("../models/Signature");

exports.create = async (req, res) => {
  try {
    const signature = await Signature.create(req.body);
    res.json(signature);
  } catch (error) {
    res.status(500).json({ error: "Erreur create signature", details: error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Signature.findAll();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Erreur getAll signature", details: error });
  }
};
