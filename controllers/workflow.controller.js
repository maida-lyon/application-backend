const Workflow = require("../models/Workflow");

exports.create = async (req, res) => {
  try {
    const record = await Workflow.create(req.body);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Erreur création workflow", details: error });
  }
};

exports.getByCommande = async (req, res) => {
  try {
    const result = await Workflow.findAll({
      where: { commandeId: req.params.id },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur get workflow", details: error });
  }
};
