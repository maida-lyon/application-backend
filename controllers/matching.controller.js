const Vehicule = require("../models/Vehicule");
const User = require("../models/User");
const Commande = require("../models/Commande");
const Matching = require("../models/Matching");
const { Op } = require("sequelize");

// === 1. Afficher tous les matchings ===
exports.getAll = async (req, res) => {
  try {
    const matchings = await Matching.findAll({
      include: [Commande, User, Vehicule],
    });
    res.json(matchings);
  } catch (error) {
    res.status(500).json({ error: "Erreur getAll matching", details: error });
  }
};

// === 2. Matching FREIGHT ===
exports.searchMatching = async (req, res) => {
  const {
    type,
    typologieMarchandise,
    poids,
    volume,
    longueur,
    largeur,
    hauteur,
    temperatureMin,
  } = req.body;

  const volCommande = volume || (longueur * largeur * hauteur) / 1000000;

  try {
    const candidats = await Vehicule.findAll({
      include: [User],
      where: {
        typologieVehicule: typologieMarchandise,
        poidsMax: { [Op.gte]: poids },
        volumeMax: { [Op.gte]: volCommande },
      },
    });

    const compatibles = candidats.filter((v) => {
      return (
        v.volumeMax >= volCommande &&
        v.poidsMax >= poids &&
        (!temperatureMin || v.temperatureMin <= temperatureMin)
      );
    });

    const matchings = compatibles.map((v) => {
      const prixTotal = poids * 0.4 + volCommande * 3 + 50;
      const commission = prixTotal * 0.2;
      const netTransporteur = prixTotal - commission;

      return {
        transporteur: v.User,
        vehicule: v,
        prixTotal,
        commission,
        netTransporteur,
        qrCode: "QR-" + Date.now(),
        rendezVous: "Demain 10h-12h",
        statut: "proposé",
      };
    });

    res.json(matchings);
  } catch (error) {
    res.status(500).json({ error: "Erreur searchMatching", details: error });
  }
};

// === 3. Matching DISTRIBUTION ===
exports.matchDistribution = async (req, res) => {
  const { commandeId } = req.body;

  try {
    const commande = await Commande.findByPk(commandeId);
    if (!commande)
      return res.status(404).json({ message: "Commande introuvable" });

    const prix = 15;
    const commission = 13;
    const remunerationRamasseur = 0.5;
    const remunerationLivreur = 1.5;

    const ramasseur = await User.findOne({ where: { role: "transporteur" } });
    const livreur = await User.findOne({ where: { email: "livreur@hub.fr" } });

    res.json({
      match: {
        commandeId,
        prixTotalFacture: prix,
        ramasseur: {
          id: ramasseur?.id || null,
          nom: ramasseur?.nom || "non assigné",
          remuneration: remunerationRamasseur,
        },
        livreurFinal: {
          id: livreur?.id || null,
          nom: livreur?.nom || "non assigné",
          remuneration: remunerationLivreur,
        },
        commissionPlateforme: commission,
        qrCode: `QR-${commandeId}`,
        facturePdf: `facture-commande-${commandeId}.pdf`,
        tracking: {
          statut: "préparée",
          position: null,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur matchDistribution", details: error });
  }
};
