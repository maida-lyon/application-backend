const Commande = require("../models/Commande");
const fs = require("fs");
const path = require("path");

exports.creerCommande = async (req, res) => {
  try {
    const {
      type,
      entrepriseChargement,
      telephoneChargement,
      adresseChargement,
      codePostalChargement,
      villeChargement,
      dateChargement,
      horaireChargement,
      instructionsChargement,
      entrepriseLivraison,
      telephoneLivraison,
      adresseLivraison,
      codePostalLivraison,
      villeLivraison,
      dateLivraison,
      horaireLivraison,
      instructionsLivraison,
      typologie,
      quantiteColis,
      poids,
      longueur,
      largeur,
      hauteur,
      metrageSol,
      temperatureMin,
      prixTotal,
      commission,
      netTransporteur,
      signatureChargement,
      signatureLivraison,
      nomSignataireChargement,
      nomSignataireLivraison,
    } = req.body;

    // Volume automatique
    const volume =
      ((parseFloat(longueur) || 0) *
        (parseFloat(largeur) || 0) *
        (parseFloat(hauteur) || 0) *
        (parseInt(quantiteColis) || 1)) /
      1000000;

    // Enregistrer les images uploadées (Multer)
    const photoChargement = req.files?.photoChargement?.[0]?.filename || null;
    const photoLivraison = req.files?.photoLivraison?.[0]?.filename || null;

    const commande = await Commande.create({
      type,
      entrepriseChargement,
      telephoneChargement,
      adresseChargement,
      codePostalChargement,
      villeChargement,
      dateChargement,
      horaireChargement,
      instructionsChargement,
      entrepriseLivraison,
      telephoneLivraison,
      adresseLivraison,
      codePostalLivraison,
      villeLivraison,
      dateLivraison,
      horaireLivraison,
      instructionsLivraison,
      typologie,
      quantiteColis,
      poids,
      longueur,
      largeur,
      hauteur,
      volume,
      metrageSol,
      temperatureMin,
      prixTotal,
      commission,
      netTransporteur,
      photoChargement,
      photoLivraison,
      signatureChargement,
      signatureLivraison,
      nomSignataireChargement,
      nomSignataireLivraison,
      UserId: req.user?.id || null,
    });

    res.status(201).json({ message: "✅ Commande créée", commande });
  } catch (err) {
    console.error("Erreur création commande :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(commandes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur getAllCommandes", erreur: err.message });
  }
};

exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (!commande)
      return res.status(404).json({ message: "Commande introuvable" });
    res.json(commande);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur getCommande", erreur: err.message });
  }
};
