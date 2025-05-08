const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./config/db");
const routes = require("./routes");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config({ path: ".env" });

const app = express();

// === ORIGINES AUTORISÉES (ngrok + localhost + vercel) ===
const allowedOrigins = [
  "http://localhost:3001",
  "https://application-livraison.vercel.app",
  "https://f86d-2a01-e0a-290-4d70-1120-1a46-eee8-1bf0.ngrok-free.app", // NGROK BACKEND ACTUEL
  undefined, // Railway / Render
];

// === CONFIGURATION CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("⛔ CORS refusé"));
    },
    credentials: true,
  })
);

// === MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));

// === ROUTES
app.use("/api", routes);

// === TEST DE VIE
app.get("/", (req, res) => {
  res.send("✅ API DeliverApp opérationnelle");
});
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// === LANCEMENT SERVEUR
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    console.log("✅ PostgreSQL connecté");

    // Création auto d’un compte admin
    const adminExists = await User.findOne({
      where: { email: "obouceloua@gmail.com" },
    });

    if (!adminExists) {
      await User.create({
        nom: "Admin Principal",
        email: "obouceloua@gmail.com",
        telephone: "0658407152",
        motdepasse: await bcrypt.hash("azerty123", 10),
        role: "admin",
        valide: true,
        force: false,
        documents: {},
      });
      console.log("✅ Compte admin créé automatiquement");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erreur serveur :", err);
  }
})();
