exports.ask = async (req, res) => {
  const { message } = req.body;

  // Simulation de réponse IA simple
  let response = "Je n'ai pas compris votre demande.";

  if (message.toLowerCase().includes("créer commande")) {
    response =
      'Pour créer une commande, allez dans /commandes et cliquez sur "Nouveau".';
  } else if (message.toLowerCase().includes("payer")) {
    response = "Pour payer un transporteur, utilisez /paiements/execute.";
  } else if (message.toLowerCase().includes("matching")) {
    response =
      "Le système matching analyse la zone, le poids et le type de véhicule.";
  }

  res.json({ message: response });
};
