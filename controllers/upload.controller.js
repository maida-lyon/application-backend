exports.uploadDocuments = async (req, res) => {
  try {
    const fichiers = req.files;
    if (!fichiers || fichiers.length === 0) {
      return res.status(400).json({ message: "Aucun fichier reçu" });
    }

    const fichiersReçus = fichiers.map((f) => f.filename);
    res
      .status(200)
      .json({ message: "Fichiers uploadés", fichiers: fichiersReçus });
  } catch (err) {
    res.status(500).json({ message: "Erreur upload", erreur: err.message });
  }
};
