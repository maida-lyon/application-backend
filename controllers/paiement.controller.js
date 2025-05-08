
const Paiement = require('../models/Paiement');

exports.execute = async (req, res) => {
const { montant } = req.body;
const commission = montant * 0.1; // 10%
const paiement = await Paiement.create({
montant,
commission,
statut: 'effectué'
});
res.json(paiement);
};
