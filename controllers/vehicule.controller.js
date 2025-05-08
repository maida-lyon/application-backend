
const Vehicule = require('../models/Vehicule');

exports.getAll = async (req, res) => {
const data = await Vehicule.findAll();
res.json(data);
};

exports.create = async (req, res) => {
const created = await Vehicule.create(req.body);
res.json(created);
};