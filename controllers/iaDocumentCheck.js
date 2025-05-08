const iaCheck = require("../utils/iaDocumentCheck");

exports.verifierDocuments = async (req, res) => {
  try {
    const fichiers = req.files;
    const resultat = {};

    for (const [key, file] of Object.entries(fichiers)) {
      const analyse = iaCheck(file[0]);
      resultat[key] = analyse;
    }

    res.status(200).json({ message: "Analyse IA terminée", resultat });
  } catch (err) {
    res.status(500).json({ message: "Erreur IA", erreur: err.message });
  }
};
