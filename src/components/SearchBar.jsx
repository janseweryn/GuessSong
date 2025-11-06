import React, { useState, useEffect } from "react";

const SearchBar = ({ onSelectSong }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔎 Pobieranie propozycji po wpisaniu 3+ liter
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(
            query
          )}&entity=song&limit=5`
        );
        const data = await response.json();

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

    const delayDebounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // 🔘 Gdy gracz wybierze opcję z listy
  const handleSelect = (title, artist) => {
    const formattedValue = `${title} - ${artist}`;
    setQuery(formattedValue);
    setSuggestions([]);
    if (onSelectSong) onSelectSong(title, artist);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 300,
        margin: "0 auto",
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Wpisz tytuł lub artystę..."
        style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: 10,
          border: "1px solid #ccc",
          outline: "none",
        }}
      />

      {loading && (
        <p style={{ color: "#bbb", fontSize: 13, marginTop: 4 }}>Ładowanie...</p>
      )}

      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 10,
            background: "white",
            color: "black",
            borderRadius: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            width: "100%",
            marginTop: 4,
            listStyle: "none",
            padding: 0,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {suggestions.map((s, index) => (
            <li
              key={index}
              onClick={() => handleSelect(s.title, s.artist)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
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
