import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";
import SearchBar from "./components/SearchBar";

const LEVELS = [
  { label: "0.1s", time: 0.2, displayTime: 0.1 },
  { label: "0.5s", time: 0.5, displayTime: 0.5 },
  { label: "1s", time: 1, displayTime: 1 },
  { label: "2s", time: 2, displayTime: 2 },
  { label: "4s", time: 4, displayTime: 4 },
  { label: "8s", time: 8, displayTime: 8 },
  { label: "15s", time: 15, displayTime: 15 },
  { label: "30s", time: 30, displayTime: 30 },
];

const CATEGORY_NAMES = {
  all: "All",
  pop: "Pop",
  rock: "Rock",
};

export default function App() {
  const [category, setCategory] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [canReplayFull, setCanReplayFull] = useState(false);
  const [fullPlayTime, setFullPlayTime] = useState(0);
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]); // 🟡 lista błędnych odpowiedzi

  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const fullIntervalRef = useRef(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (fullIntervalRef.current) clearInterval(fullIntervalRef.current);
  };

  const startNewSong = (songsList) => {
    if (!songsList.length) return;
    const idx = Math.floor(Math.random() * songsList.length);
    const selected = songsList[idx];
    setCurrentSong(selected);
    setSnippetIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setUserGuess("");
    setIsCorrect(false);
    setGameOver(false);
    setCanReplayFull(false);
    setFullPlayTime(0);
    setIsFullPlaying(false);
    setWrongAnswers([]); // 🔄 reset błędnych odpowiedzi
    clearTimers();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const selectCategory = (cat) => {
    let filtered = [];
    if (cat === "all") filtered = songsData;
    else {
      filtered = songsData.filter((song) =>
        song.categories.some((c) => c.toLowerCase().includes(cat))
      );
    }
    setCategory(cat);
    setFilteredSongs(filtered);
    startNewSong(filtered);
  };

  const playSnippet = () => {
    if (!currentSong || !audioRef.current) return;
    clearTimers();

    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setIsPlaying(true);
    setCurrentTime(0);

    const level = LEVELS[snippetIndex];

    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => +(prev + 0.1).toFixed(1));
    }, 100);

    timeoutRef.current = setTimeout(() => {
      stopSnippet();
    }, level.time * 1000);
  };

  const stopSnippet = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    clearTimers();
  };

  // 🧠 Weryfikacja odpowiedzi gracza
  const handleGuess = () => {
    if (!currentSong) return;
    const [guessTitle, guessArtist = ""] = userGuess
      .split(" - ")
      .map((t) => t.trim().toLowerCase());

    const correctTitle = currentSong.title.toLowerCase();
    const correctArtist = currentSong.artist.toLowerCase();

    if (guessTitle === correctTitle && guessArtist === correctArtist) {
      setIsCorrect(true);
      setCanReplayFull(true);
      stopSnippet();
    } else {
      // 🟥 błędna odpowiedź → dodaj do listy
      const artistMatches =
        guessArtist && correctArtist.includes(guessArtist.toLowerCase());

      setWrongAnswers((prev) => [
        ...prev,
        {
          title: userGuess,
          artistCorrect: artistMatches,
        },
      ]);

      // automatyczny skip do następnego timestampa
      skipToNext();
    }

    setUserGuess("");
  };

  const skipToNext = () => {
    stopSnippet();
    if (snippetIndex < LEVELS.length - 1) {
      setSnippetIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
      setCanReplayFull(true);
    }
  };

  const giveUp = () => {
    stopSnippet();
    setGameOver(true);
    setCanReplayFull(true);
  };

  const playFullSong = () => {
    if (!currentSong || !audioRef.current) return;
    clearTimers();

    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setIsFullPlaying(true);
    setFullPlayTime(0);

    fullIntervalRef.current = setInterval(() => {
      setFullPlayTime((prev) => prev + 0.1);
    }, 100);
  };

  const stopFullSong = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsFullPlaying(false);
    if (fullIntervalRef.current) clearInterval(fullIntervalRef.current);
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const displayedTime = (() => {
    const level = LEVELS[snippetIndex];
    const scale = level.displayTime / level.time;
    const scaled = currentTime * scale;
    return scaled > level.displayTime ? level.displayTime : scaled;
  })();

  return (
  <div
    style={{
      background: "#222",
      color: "white",
      fontFamily: "sans-serif",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        textAlign: "center",
        width: "100%",
        maxWidth: 500,
        padding: 20,
      }}
    >
      <h1 style={{ fontSize: "1.8em", marginBottom: 10 }}>🎵 SongGuess 🎵</h1>
      <p style={{ fontSize: "1em", opacity: 0.8 }}>🎧 Kategoria: All</p>
      <p>
        Fragment length: <strong>{fragmentLength.toFixed(1)}s</strong>
      </p>
      <p>
        ⏱ {playTime.toFixed(1)}s / {fragmentLength.toFixed(1)}s
      </p>

      {/* Sekcja po trafieniu */}
      {isCorrect && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ color: "#4caf50" }}>✅ Correct!</h2>
          <p>
            <strong>Tytuł:</strong> {currentSong.title}
            <br />
            <strong>Artysta:</strong> {currentSong.artist}
          </p>

          {currentSong.cover && (
            <img
              src={currentSong.cover}
              alt="cover"
              width={220}
              style={{
                borderRadius: 12,
                marginTop: 14,
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            />
          )}

          <button
            onClick={() => startNewSong(filteredSongs)}
            style={{
              marginTop: 24,
              background: "#1976d2",
              color: "white",
              padding: "8px 14px",
              borderRadius: 8,
            }}
          >
            Next Song →
          </button>
        </div>
      )}

      {/* Sekcja po poddaniu się */}
      {gameOver && !isCorrect && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ color: "red" }}>❌ Nie udało się odgadnąć</h2>
          <p>
            <strong>Tytuł:</strong> {currentSong.title}
            <br />
            <strong>Artysta:</strong> {currentSong.artist}
          </p>

          {currentSong.cover && (
            <img
              src={currentSong.cover}
              alt="cover"
              width={220}
              style={{
                borderRadius: 12,
                marginTop: 14,
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            />
          )}

          <button
            onClick={() => startNewSong(filteredSongs)}
            style={{
              marginTop: 24,
              background: "#1976d2",
              color: "white",
              padding: "8px 14px",
              borderRadius: 8,
            }}
          >
            Next Song →
          </button>
        </div>
      )}

      {/* Sekcja główna gry, gdy nie skończona */}
      {!isCorrect && !gameOver && (
        <div style={{ marginTop: 20 }}>
          <SearchBar
            onSelectSong={(title, artist) => setUserGuess(`${title} - ${artist}`)}
          />
          <button
            onClick={handleGuess}
            style={{
              marginTop: 12,
              background: "#4caf50",
              color: "white",
              padding: "6px 10px",
              borderRadius: 6,
            }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Sekcja błędnych prób */}
      {wrongAnswers.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {wrongAnswers.map((ans, index) => (
            <div
              key={index}
              style={{
                marginTop: 8,
                padding: "8px 12px",
                borderRadius: 10,
                border: "1px solid #333",
                background:
                  ans.artistMatch === true ? "#ffeb3b" : "rgba(255,0,0,0.3)",
                color: ans.artistMatch === true ? "black" : "white",
              }}
            >
              ❌ {ans.title} – {ans.artist}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
