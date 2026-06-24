// File: pages/api/generate.js
// Version corrigée avec l'en-tête anthropic-version

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { expertise, facts } = req.body;

  if (!expertise || !facts || facts.length !== 3) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const prompt = `Tu es un expert en création de contenu viral. Crée 30 jours de contenu pour quelqu'un dans: "${expertise}"

Basé sur ces 3 faits clés:
1. ${facts[0]}
2. ${facts[1]}
3. ${facts[2]}

Retourne UNIQUEMENT un JSON valide (pas de texte avant/après) avec cette structure exacte:
{
  "linkedin": [
    {"day": 1, "post": "Post court LinkedIn (max 150 caractères)", "hook": "Hook qui accroche"},
    {"day": 2, "post": "...", "hook": "..."}
  ],
  "tiktok": [
    {"day": 1, "script": "Script vidéo TikTok (3-4 lignes)", "idea": "Idée vidéo concrète"},
    {"day": 2, "script": "...", "idea": "..."}
  ],
  "email": [
    {"day": 1, "subject": "Sujet email court", "body": "Corps email (2-3 phrases)"},
    {"day": 2, "subject": "...", "body": "..."}
  ]
}

Crée 30 entrées pour chaque plateforme (linkedin, tiktok, email). Chaque jour DOIT être DIFFÉRENT. Varie les sujets. Chaque post doit être PRÊT À COPIER-COLLER.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 8000,
        messages: [
          { role: "user", content: prompt }
        ],
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(500).json({ error: `API error: ${response.status} - ${errorText}` });
    }

    const data = await response.json();

    if (data.error) {
      console.error('API returned error:', data.error);
      return res.status(500).json({ error: data.error.message || 'API error' });
    }

    const textContent = data.content[0]?.text || '';

    // Extract JSON from response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Failed to parse content' });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return res.status(200).json(parsed);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
