const fs = require("fs");
const path = require("path");

const rootDir = "./";
const files = fs.readdirSync(rootDir);

const deleted = [];

files.forEach((file) => {
  if (file.startsWith("setup-") && file.endsWith(".js")) {
    fs.unlinkSync(path.join(rootDir, file));
    deleted.push(file);
  }
});

if (deleted.length > 0) {
  console.log("Fichiers supprimés :");
  deleted.forEach((f) => console.log("✔", f));
} else {
  console.log("Aucun fichier setup-*.js trouvé à supprimer.");
}
