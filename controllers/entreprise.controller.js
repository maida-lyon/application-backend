
const Entreprise = require('../models/Entreprise');

exports.getAll = async (req, res) => {
const data = await Entreprise.findAll();
res.json(data);
};

exports.create = async (req, res) => {
const created = await Entreprise.create(req.body);
res.json(created);
};