
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

exports.generate = async (req, res) => {
const { user, montant, description } = req.body;

const doc = new PDFDocument();
const filename = `facture-${Date.now()}.pdf`;
const filePath = path.join(__dirname, '../../backend/public/', filename);

doc.pipe(fs.createWriteStream(filePath));
doc.fontSize(20).text('FACTURE', { align: 'center' });
doc.moveDown();
doc.fontSize(12).text(`Client: ${user}`);
doc.text(`Description: ${description}`);
doc.text(`Montant: ${montant} €`);
doc.end();

res.json({ url: `/public/${filename}` });
};