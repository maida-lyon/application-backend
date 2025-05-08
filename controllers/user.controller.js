const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { nom, email, telephone, motdepasse, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "Email déjà utilisé" });

    const hash = await bcrypt.hash(motdepasse, 10);

    const documents = {
      kbis: req.files?.kbis?.[0]?.filename || "",
      assurance: req.files?.assurance?.[0]?.filename || "",
      identite: req.files?.identite?.[0]?.filename || "",
      rib: req.files?.rib?.[0]?.filename || "",
      justificatif: req.files?.justificatif?.[0]?.filename || "",
    };

    const user = await User.create({
      nom,
      email,
      telephone,
      motdepasse: hash,
      role,
      documents,
      valide: false,
      force: false,
    });

    res
      .status(201)
      .json({ message: "✅ Compte créé. En attente de validation", user });
  } catch (err) {
    console.error("Erreur registerUser :", err);
    res
      .status(500)
      .json({ message: "Erreur création utilisateur", erreur: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, motdepasse } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Utilisateur inconnu" });

  const valid = await bcrypt.compare(motdepasse, user.motdepasse);
  if (!valid)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  if (!user.valide && !user.force) {
    return res.status(403).json({ message: "Compte non validé par l'admin" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Connexion réussie", role: user.role });
};

exports.getProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Non connecté" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["motdepasse"] },
    });

    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    res.json(user);
  } catch (err) {
    console.error("Erreur getProfile :", err);
    res.status(500).json({ message: "Erreur getProfile", erreur: err.message });
  }
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnecté" });
};
