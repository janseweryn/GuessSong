// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import manualSongs from "../manualSongs.json"; // <-- tu twoje ręczne utwory

const SearchBar = ({ onSelectSong }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        // --- iTunes API ---
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`
        );
        const data = await response.json();
        const itunesResults = data.results.map((song) => ({
          title: song.trackName,
          artist: song.artistName,
          source: "itunes", // opcjonalnie do oznaczenia w UI
        }));

        // --- ręczne utwory ---
        const manualResults = manualSongs
          .filter(
            (s) =>
              s.title.toLowerCase().includes(query.toLowerCase()) ||
              s.artist.toLowerCase().includes(query.toLowerCase())
          )
          .map((s) => ({ ...s, source: "manual" }));

        // --- połączenie obu źródeł ---
        setSuggestions([...itunesResults, ...manualResults]);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (title, artist) => {
    setQuery(`${title} - ${artist}`);
    setSuggestions([]);
    onSelectSong?.(title, artist);
  };

  return (
    <div className="search-input-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Wpisz tytuł lub artystę..."
        className="main-search-input"
      />
      
      {loading && <div className="loader-mini"></div>}

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, index) => (
            <li 
              key={index} 
              onClick={() => handleSelect(s.title, s.artist)} 
              className="suggestion-item"
            >
              <div className="suggestion-content">
                <span className="s-title">{s.title}</span>
                <span className="s-separator"> - </span>
                <span className="s-artist">{s.artist}</span>
                {s.source === "manual" && (
                  <span className="manual-badge"> (manual)</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;