
const fs = require('fs');
const path = require('path');
const Document = require('../models/Document');

exports.getAll = async (req, res) => {
const docs = await Document.findAll();
res.json(docs);
};

exports.create = async (req, res) => {
const doc = await Document.create(req.body);
res.json(doc);
};

exports.upload = async (req, res) => {
if (!req.file) {
return res.status(400).json({ error: 'Aucun fichier reçu' });
}

const fileName = req.file.filename;
const filePath = '/uploads/' + fileName;

// Simulation d'une validation IA
const extension = path.extname(fileName).toLowerCase();
const isValid = ['.pdf', '.jpg', '.jpeg', '.png'].includes(extension);
const statut = isValid ? 'validé' : 'refusé';
const raisonRefus = isValid ? null : 'Extension de fichier non autorisée';

const document = await Document.create({
type: req.body.type || 'non spécifié',
url: filePath,
statut,
raisonRefus
});

res.json({
message: 'Fichier reçu',
fichier: fileName,
statut,
raisonRefus,
document
});
};
