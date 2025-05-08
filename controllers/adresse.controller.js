
const axios = require('axios');
const Adresse = require('../models/Adresse');

exports.geocode = async (req, res) => {
const { adresse, type } = req.body;

try {
const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adresse)}&format=json&limit=1`;
const response = await axios.get(url, {
headers: { 'User-Agent': 'Application-Livraison/1.0' }
});

if (response.data.length === 0) {
return res.status(404).json({ error: 'Adresse non trouvée' });
}

const data = response.data[0];

const ad = await Adresse.create({
rue: adresse,
codePostal: '', // à extraire si nécessaire
ville: '', // à extraire si nécessaire
pays: 'France',
type,
latitude: data.lat,
longitude: data.lon
});

res.json(ad);
} catch (error) {
res.status(500).json({ error: 'Erreur géocodage' });
}
};
