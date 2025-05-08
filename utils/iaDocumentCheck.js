module.exports = function simulateIA(file) {
    const name = file.originalname.toLowerCase();
    if (!name.endsWith(".pdf") && !name.endsWith(".jpg") && !name.endsWith(".png")) {
      return "❌ Format invalide";
    }
    if (name.includes("vide")) return "❌ Fichier vide ou illisible";
    if (name.includes("expiré") || name.includes("2022")) return "❌ Document expiré";
    if (name.includes("kbis") || name.includes("assurance") || name.includes("rib")) return "✅ Document valide";
    return "⚠️ Document lisible mais non reconnu automatiquement";
  };
  