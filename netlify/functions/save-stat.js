const { createClient } = require('@supabase/supabase-js');

// Te dane Netlify samo pobierze z "Environment variables", które w panelu
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  // Obsługa CORS (żeby przeglądarka nie blokowała zapytania)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Obsługa zapytania wstępnego (pre-flight)
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  try {
    const { songKey, title, level } = JSON.parse(event.body);

    // Wrzucamy dane do tabeli 'song_stats' w Supabase
    const { error } = await supabase
      .from('song_stats')
      .insert([{ song_key: songKey, title: title, level: level }]);

    if (error) throw error;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Zapisano statystykę!" }),
    };
  } catch (error) {
    console.error("Błąd bazy:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};