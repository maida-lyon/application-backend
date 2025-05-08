const jwt = require("jsonwebtoken");

exports.authentifier = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Non connecté" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token invalide" });
  }
};

exports.estAdmin = (req, res, next) => {
  if (req.user?.role === "admin") next();
  else res.status(403).json({ message: "Accès admin refusé" });
};
