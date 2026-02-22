import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    const { songKey } = event.queryStringParameters;

    // Pobieramy absolutnie wszystkie dane historyczne dla tej piosenki
    const { data, error } = await supabase
      .from('song_stats')
      .select('level')
      .eq('song_key', songKey);

    if (error) throw error;

    // Przeliczamy dystrybucję (ilość zgadnięć na każdym progu)
    const distribution = data.reduce((acc, curr) => {
      acc[curr.level] = (acc[curr.level] || 0) + 1;
      return acc;
    }, {});

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        total: data.length, // Łączna liczba gier w całej historii bazy
        distribution
      }),
    };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};