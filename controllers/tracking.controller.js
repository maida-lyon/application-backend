// Simule un stockage temporaire des positions
let positionData = {
  latitude: "45.75",
  longitude: "4.85",
  statut: "en route",
};

// Mettre à jour la position GPS
exports.updateLocation = async (req, res) => {
  const { latitude, longitude, statut } = req.body;
  positionData = {
    latitude: latitude || positionData.latitude,
    longitude: longitude || positionData.longitude,
    statut: statut || positionData.statut,
  };
  res.json({ message: "Position mise à jour", position: positionData });
};

// Récupérer le statut d’un transporteur
exports.getStatus = async (req, res) => {
  const id = req.params.id;
  res.json({
    id,
    position: positionData,
    message: "Suivi actif",
  });
};
