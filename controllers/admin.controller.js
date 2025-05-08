const { Op } = require("sequelize");
const User = require("../models/User");

exports.getComptes = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: { [Op.not]: "admin" },
        valide: false,
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(users);
  } catch (err) {
    console.error("❌ Erreur getComptes :", err);
    res.status(500).json({ message: "Erreur récupération comptes" });
  }
};

exports.validateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.valide = true;
    user.forcé = false;
    await user.save();

    res.json({ message: "✅ Utilisateur validé avec succès", user });
  } catch (err) {
    console.error("❌ Erreur validateUser :", err);
    res.status(500).json({ message: "Erreur validation utilisateur" });
  }
};

exports.refuseUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.destroy();
    res.json({ message: "❌ Utilisateur supprimé/refusé" });
  } catch (err) {
    console.error("❌ Erreur refuseUser :", err);
    res.status(500).json({ message: "Erreur refus utilisateur" });
  }
};

exports.forceValidation = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.valide = true;
    user.forcé = true;
    await user.save();

    res.json({ message: "⚠️ Validation forcée exécutée", user });
  } catch (err) {
    console.error("❌ Erreur forceValidation :", err);
    res.status(500).json({ message: "Erreur validation forcée" });
  }
};
