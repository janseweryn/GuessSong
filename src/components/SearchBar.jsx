import React, { useState, useEffect } from "react";

const SearchBar = ({ onSelectSong }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Gdy użytkownik wpisze 3+ litery, pobieramy propozycje z iTunes
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`
        );
        const data = await response.json();

        // Formatowanie wyników: "tytuł - artysta"
        const formatted = data.results.map((song) => ({
          title: song.trackName,
          artist: song.artistName,
        }));

        setSuggestions(formatted);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 400); // opóźnienie wpisywania
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (title, artist) => {
    setQuery(`${title} - ${artist}`);
    setSuggestions([]);
    onSelectSong?.(title, artist);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Wpisz tytuł lub artystę..."
        className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {loading && <p className="text-sm text-gray-400 mt-1">Ładowanie...</p>}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-md rounded-lg w-full mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((s, index) => (
            <li
              key={index}
              onClick={() => handleSelect(s.title, s.artist)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {s.title} – {s.artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
