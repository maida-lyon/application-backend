
const Litige = require('../models/Litige');

exports.create = async (req, res) => {
const litige = await Litige.create(req.body);
res.json(litige);
};

exports.getAll = async (req, res) => {
const list = await Litige.findAll();
res.json(list);
};
