import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";

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

// Czytelne nazwy kategorii
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

  const handleGuess = () => {
    if (!currentSong) return;
    if (userGuess.trim().toLowerCase() === currentSong.title.toLowerCase()) {
      setIsCorrect(true);
      setCanReplayFull(true);
      stopSnippet();
    }
  };

  const skipToNext = () => {
    stopSnippet();
    if (snippetIndex < LEVELS.length - 1) {
      setSnippetIndex(snippetIndex + 1);
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
        textAlign: "center",
        padding: 20,
        fontFamily: "sans-serif",
        color: "white",
        background: "#222",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: 20 }}>
        🎵 SongGuess 🎵
      </h1>

      {!category ? (
        <div style={{ marginTop: 40 }}>
          <h2>Wybierz kategorię:</h2>
          <div style={{ marginTop: 20 }}>
            <button onClick={() => selectCategory("all")} style={{ margin: 8 }}>
              🎧 All
            </button>
            <button onClick={() => selectCategory("pop")} style={{ margin: 8 }}>
              🎤 Pop
            </button>
            <button
              onClick={() => selectCategory("rock")}
              style={{ margin: 8 }}
            >
              🎸 Rock
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              setCategory(null);
              setCurrentSong(null);
              clearTimers();
            }}
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "#555",
              borderRadius: 8,
              padding: "6px 10px",
              color: "white",
            }}
          >
            ⬅ Wróć
          </button>

          {currentSong && (
            <>
              {/* 🟣 Dodany napis z kategorią */}
              <h2
                style={{
                  marginBottom: 10,
                  color: "#ccc",
                  background: "linear-gradient(90deg, #bb86fc, #03dac6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                🎵 Kategoria:{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {CATEGORY_NAMES[category] || category}
                </span>
              </h2>

              <h3>
                Fragment length: <strong>{LEVELS[snippetIndex].label}</strong>
              </h3>
              <p>
                ⏱ {displayedTime.toFixed(1)} s /{" "}
                {LEVELS[snippetIndex].displayTime}s
              </p>

              <audio ref={audioRef} src={currentSong.snippet} />

              {!isCorrect && !gameOver && (
                <>
                  <div>
                    {!isPlaying ? (
                      <button onClick={playSnippet}>▶️ Play</button>
                    ) : (
                      <button onClick={stopSnippet}>⏹ Stop</button>
                    )}
                    <button onClick={skipToNext} style={{ marginLeft: 8 }}>
                      ⏭ Skip
                    </button>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <input
                      type="text"
                      placeholder="Guess the title..."
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      style={{ padding: "6px 8px", width: 220 }}
                    />
                    <button onClick={handleGuess} style={{ marginLeft: 8 }}>
                      Submit
                    </button>
                  </div>

                  {snippetIndex === LEVELS.length - 1 && (
                    <div style={{ marginTop: 12 }}>
                      <button
                        onClick={giveUp}
                        style={{
                          background: "#ff5555",
                          color: "white",
                          padding: "6px 10px",
                        }}
                      >
                        Give Up
                      </button>
                    </div>
                  )}
                </>
              )}

              {isCorrect && (
                <div style={{ marginTop: 16 }}>
                  <h2>✅ Correct!</h2>
                  <p>
                    <strong>Tytuł:</strong> {currentSong.title}
                    <br />
                    <strong>Artysta:</strong> {currentSong.artist}
                  </p>

                  {currentSong.cover && (
                    <img
                      src={currentSong.cover}
                      alt="cover"
                      width={200}
                      style={{ borderRadius: 12, marginTop: 10 }}
                    />
                  )}

                  <div style={{ marginTop: 12 }}>
                    {isFullPlaying ? (
                      <button
                        onClick={stopFullSong}
                        style={{
                          background: "#e53935",
                          color: "white",
                          padding: "6px 10px",
                        }}
                      >
                        ⏹ Stop Full Snippet
                      </button>
                    ) : (
                      <button
                        onClick={playFullSong}
                        style={{
                          background: "#4caf50",
                          color: "white",
                          padding: "6px 10px",
                        }}
                      >
                        ▶️ Play Full Snippet
                      </button>
                    )}
                    {isFullPlaying && (
                      <p style={{ marginTop: 6 }}>
                        ⏱ {fullPlayTime.toFixed(1)} s
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => startNewSong(filteredSongs)}
                    style={{ marginTop: 10 }}
                  >
                    Next Song →
                  </button>
                </div>
              )}

              {gameOver && !isCorrect && (
                <div style={{ marginTop: 16 }}>
                  <h2 style={{ color: "red", fontSize: "2em" }}>❌</h2>
                  <h2>😞 Nie udało się odgadnąć</h2>
                  <p>
                    <strong>Tytuł:</strong> {currentSong.title}
                    <br />
                    <strong>Artysta:</strong> {currentSong.artist}
                  </p>

                  {currentSong.cover && (
                    <img
                      src={currentSong.cover}
                      alt="cover"
                      width={200}
                      style={{ borderRadius: 12, marginTop: 10 }}
                    />
                  )}

                  {canReplayFull && (
                    <div style={{ marginTop: 12 }}>
                      {isFullPlaying ? (
                        <button
                          onClick={stopFullSong}
                          style={{
                            background: "#e53935",
                            color: "white",
                            padding: "6px 10px",
                          }}
                        >
                          ⏹ Stop Full Snippet
                        </button>
                      ) : (
                        <button
                          onClick={playFullSong}
                          style={{
                            background: "#4caf50",
                            color: "white",
                            padding: "6px 10px",
                          }}
                        >
                          ▶️ Play Full Snippet
                        </button>
                      )}
                      {isFullPlaying && (
                        <p style={{ marginTop: 6 }}>
                          ⏱ {fullPlayTime.toFixed(1)} s
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => startNewSong(filteredSongs)}
                    style={{ marginTop: 10 }}
                  >
                    Try again
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
