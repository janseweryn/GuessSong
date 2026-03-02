import React, { useState, useEffect } from "react";
import manualSongs from "../manualSongs.json";

const SearchBar = ({ onSelectSong }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false); // ⬅️ NOWE: blokada listy po wyborze

  useEffect(() => {
    if (locked) return;              // ⬅️ jeśli wybrano utwór, NIE pobieramy listy
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const q = query.toLowerCase();
        const parts = q.split(" ").filter(Boolean);

        const manualResults = manualSongs.filter(song =>
          parts.every(p =>
            `${song.title} ${song.artist}`.toLowerCase().includes(p)
          )
        );

        const res = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`
        );
        const data = await res.json();

        const itunesResults = data.results
          .map(s => ({ title: s.trackName, artist: s.artistName }))
          .filter(it =>
            !manualResults.some(
              m =>
                m.title.toLowerCase() === it.title.toLowerCase() &&
                m.artist.toLowerCase() === it.artist.toLowerCase()
            )
          );

        setSuggestions([...manualResults, ...itunesResults]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const t = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(t);
  }, [query, locked]);

  const handleSelect = (t, a) => {
    setQuery(`${t} - ${a}`);
    setSuggestions([]);
    setLocked(true);          // ⬅️ BLOKUJEMY listę na stałe
    onSelectSong?.(t, a);
  };

  return (
    <div className="search-root">
      <div className="search-box">
        <span className="search-icon">🔍</span>

        <input
          className="main-search-input"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setLocked(false); // ⬅️ zaczynam pisać → lista może wrócić
          }}
          placeholder="Wpisz tytuł lub artystę..."
        />

        {loading && <div className="loader-mini" />}
      </div>

      {!locked && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="suggestion-item"
              onClick={() => handleSelect(s.title, s.artist)}
            >
              <span className="s-title">{s.title}</span>
              <span className="s-separator"> – </span>
              <span className="s-artist">{s.artist}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;