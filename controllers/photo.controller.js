
const Photo = require('../models/Photo');

exports.create = async (req, res) => {
const photo = await Photo.create(req.body);
res.json(photo);
};

exports.getAll = async (req, res) => {
const list = await Photo.findAll();
res.json(list);
};
