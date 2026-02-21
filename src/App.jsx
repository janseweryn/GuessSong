import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";
import SearchBar from "./components/SearchBar";

// 🟢 RĘCZNIE DEFINIOWANE DAILY
const manualDaily = {
    "2026-02-21": [
    {
      title: "Revolving Door",
      artist: "Tate McRae",
      cover: "/songs/covers/so_close_to_what.jpg",
      snippet: "/songs/pop/revolving_door.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Whole Lotta Love",
      artist: "Led Zeppelin", 
      cover:  "/songs/covers/zeppelin2.jpg",
      snippet: "/songs/rock/whole_lotta.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Godzilla (feat. Juice WRLD)",
      artist: "Eminem",
      cover: "/songs/covers/musicmurder.jpg",
      snippet: "/songs/rap/godzilla.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-02-22": [
    {
      title: "Sofia",
      artist: "Alvaro Soler",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/05/d7/e1/05d7e189-c4d5-331f-0327-da3add4bae06/16UMGIM14728.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/alvaro_soler_sofia.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Ironic",
      artist: "Alanis Morissette",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Features124/v4/5f/3b/ca/5f3bca60-024c-d4aa-d638-6d58e7e81461/mza_1406686761081396977.jpg/600x600bb.jpg",
      snippet: "/songs/rock/alanis_morissette_ironic.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "1-800-273-8255 (feat. Alessia Cara & Khalid)",
      artist: "Logic",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/84/71/13/8471139e-5f02-b603-a462-9a8a62f14af4/17UMGIM87027.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/logic_1_800_273_8255_feat_alessia_cara_khalid.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
};


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
  rap: "Rap",
  polish_all: "Polskie",
  polish_pop: "Polskie Pop",
  polish_rock: "Polskie Rock",
  polish_rap: "Polskie Rap",
};

const simplifyText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/\s*[\(\[][^)]*[\)\]]\s*/g, "")
    .replace(/[.,/#!$%^&*;:{}=\-_`~]/g, "")
    .trim();
};

function getManualDailySongs() {
  const today = new Date();
  const polandTime = new Date(today.toLocaleString("en-US", { timeZone: "Europe/Warsaw" }));
  const dateKey = polandTime.toISOString().split("T")[0];
  return typeof manualDaily !== 'undefined' ? manualDaily[dateKey] : null;
}

export default function App() {
  const [mode, setMode] = useState("menu"); 
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
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [dailySongs, setDailySongs] = useState([]);
  const [dailyIndex, setDailyIndex] = useState(0);
  const [dailyComplete, setDailyComplete] = useState(false);
  const [noDaily, setNoDaily] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // --- ZAKTUALIZOWANE: Wysyłanie danych do funkcji Netlify ---
  const sendGuessStat = async (song, levelLabel) => {
    try {
      await fetch("/.netlify/functions/save-stat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songKey: song.snippet,
          title: song.title,
          level: levelLabel
        })
      });
      console.log("🚀 Statystyka wysłana do bazy danych!");
    } catch (err) {
      console.error("❌ Błąd statystyk:", err);
    }
  };

  const clearTimers = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };

  const startNewSong = (songsList) => {
    const list = songsList || filteredSongs;
    if (!list || list.length === 0) return console.error("Brak piosenek do losowania!");
    const idx = Math.floor(Math.random() * list.length);
    const song = list[idx];
    setCurrentSong(song);
    setSnippetIndex(0);
    setIsCorrect(false);
    setGameOver(false);
    setCanReplayFull(false);
    setIsPlaying(false);
    setWrongAnswers([]);
    clearTimers();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const selectCategory = (cat) => {
    const allSongs = Array.isArray(songsData) ? songsData : songsData.songs;

    let filtered = [];
    if (cat === "all") {
      filtered = allSongs;
    } else if (cat.startsWith("polish")) {
      filtered = allSongs.filter(
        (s) => s && s.categories && Array.isArray(s.categories) && 
               s.categories.some((c) => c.toLowerCase().startsWith("polsk"))
      );
      if (cat === "polish_pop") filtered = filtered.filter((s) => s.categories.includes("Polskie Pop"));
      if (cat === "polish_rock") filtered = filtered.filter((s) => s.categories.includes("Polskie Rock"));
      if (cat === "polish_rap") filtered = filtered.filter((s) => s.categories.includes("Polskie Rap"));
    } else {
      filtered = allSongs.filter(
        (s) => s && s.categories && Array.isArray(s.categories) && 
               s.categories.some((c) => c.toLowerCase().includes(cat.toLowerCase()))
      );
    }

    if (!filtered || filtered.length === 0) return;
    setCategory(cat);
    setFilteredSongs(filtered);
    setMode("category");
    startNewSong(filtered);
  };

  const startDaily = () => {
    const todayDaily = getManualDailySongs();
    if (!todayDaily) return setNoDaily(true);
    setDailySongs(todayDaily);
    setDailyIndex(0);
    setCurrentSong(todayDaily[0]);
    setMode("daily");
    setDailyComplete(false);
    setNoDaily(false);
  };

  const playSnippet = () => {
    if (!currentSong) return;
    const level = LEVELS[snippetIndex];
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
    setCurrentTime(0);
    intervalRef.current = setInterval(() => setCurrentTime((t) => t + 0.1), 100);
    timeoutRef.current = setTimeout(() => stopSnippet(), level.time * 1000);
  };

  const stopSnippet = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    clearTimers();
  };

  const handleGuess = () => {
    const parts = userGuess.split(" - ");
    const guessedTitle = parts[0] || "";
    const guessedArtist = parts[1] || "";

    const simplifiedGuess = simplifyText(guessedTitle);
    const simplifiedCorrect = simplifyText(currentSong.title);

    if (simplifiedGuess === simplifiedCorrect) {
      setIsCorrect(true);
      stopSnippet();
      setCanReplayFull(true);
      sendGuessStat(currentSong, LEVELS[snippetIndex].label);
    } else {
      const artistMatches = guessedArtist && currentSong.artist.toLowerCase().includes(guessedArtist.toLowerCase().trim());
      setWrongAnswers((prev) => [...prev, { title: userGuess, artistCorrect: artistMatches }]);
      skipToNext();
    }
    setUserGuess("");
  };

  const skipToNext = () => {
    stopSnippet();
    if (snippetIndex < LEVELS.length - 1) {
      setSnippetIndex((i) => i + 1);
    } else {
      setGameOver(true);
      setCanReplayFull(true);
      sendGuessStat(currentSong, "fail");
    }
  };

  const giveUp = () => {
    stopSnippet();
    setGameOver(true);
    setCanReplayFull(true);
    sendGuessStat(currentSong, "fail");
  };

  const playFullSong = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
    setIsFullPlaying(true);
  };

  const stopFullSong = () => {
    audioRef.current.pause();
    setIsFullPlaying(false);
  };

  const nextDailySong = () => {
    if (dailyIndex < dailySongs.length - 1) {
      const next = dailyIndex + 1;
      setDailyIndex(next);
      setCurrentSong(dailySongs[next]);
      setSnippetIndex(0);
      setIsCorrect(false);
      setGameOver(false);
      setCanReplayFull(false);
      setWrongAnswers([]);
    } else setDailyComplete(true);
  };

  const displayedTime = (() => {
    const level = LEVELS[snippetIndex];
    const scale = level.displayTime / level.time;
    const scaled = currentTime * scale;
    return scaled > level.displayTime ? level.displayTime : scaled;
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "100vh", color: "white", background: "#222", padding: 20 }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: 20 }}>🎵 SongGuess 🎵</h1>

      {mode === "menu" && (
        <>
          <h2>Wybierz kategorię:</h2>
          <div style={{ marginTop: 20 }}>
            <button onClick={() => selectCategory("all")} style={{ margin: 8 }}>🎧 All</button>
            <button onClick={() => selectCategory("pop")} style={{ margin: 8 }}>🎤 Pop</button>
            <button onClick={() => selectCategory("rock")} style={{ margin: 8 }}>🎸 Rock</button>
            <button onClick={() => selectCategory("rap")} style={{ margin: 8 }}>🧢 Rap</button>
            <div style={{ marginTop: 30 }}>
              <h3 style={{ color: "#aaa" }}>🇵🇱 Polskie</h3>
              <button onClick={() => selectCategory("polish_all")} style={{ margin: 8 }}>🇵🇱 🎧 Polskie</button>
              <button onClick={() => selectCategory("polish_pop")} style={{ margin: 8 }}>🇵🇱 🎤 Polski Pop</button>
              <button onClick={() => selectCategory("polish_rock")} style={{ margin: 8 }}>🇵🇱 🎸 Polski Rock</button>
              <button onClick={() => selectCategory("polish_rap")} style={{ margin: 8 }}>🇵🇱 🧢 Polski Rap</button>
            </div>
            <div style={{ marginTop: 30 }}>
              <button onClick={startDaily} style={{ background: "#8b5cf6", color: "white", padding: "10px 16px", borderRadius: 10, fontWeight: "bold" }}>🎯 Daily Challenge</button>
            </div>
            {noDaily && <p style={{ color: "#ff5555" }}>Brak daily na dziś 😢</p>}
          </div>
        </>
      )}

      {mode === "category" && currentSong && (
        <GameView
          title={`🎵 ${CATEGORY_NAMES[category]} Mode`}
          onBack={() => { setMode("menu"); setCategory(null); clearTimers(); }}
          {...{ currentSong, snippetIndex, displayedTime, LEVELS, audioRef, isPlaying, playSnippet, stopSnippet, skipToNext, giveUp, wrongAnswers, isCorrect, gameOver, userGuess, setUserGuess, handleGuess, isFullPlaying, playFullSong, stopFullSong, startNewSong: () => startNewSong(filteredSongs) }}
        />
      )}

      {mode === "daily" && currentSong && (
        <>
          {!dailyComplete ? (
            <GameView
              title={`🎯 Daily ${dailyIndex + 1} / ${dailySongs.length} — ${currentSong.dailyCategory}`}
              onBack={() => setMode("menu")}
              {...{ currentSong, snippetIndex, displayedTime, LEVELS, audioRef, isPlaying, playSnippet, stopSnippet, skipToNext, giveUp, wrongAnswers, isCorrect, gameOver, userGuess, setUserGuess, handleGuess, isFullPlaying, playFullSong, stopFullSong, startNewSong: nextDailySong }}
            />
          ) : (
            <div style={{ marginTop: 100, textAlign: "center" }}>
              <h2 style={{ fontSize: "2rem", marginBottom: 20 }}>✅ Daily ukończone!</h2>
              <button onClick={() => setMode("menu")} style={{ background: "#555", color: "white", padding: "10px 16px", borderRadius: 10, fontWeight: "bold" }}>⬅ Wróć na stronę główną</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function GameView({ title, onBack, currentSong, snippetIndex, displayedTime, LEVELS, audioRef, isPlaying, playSnippet, stopSnippet, skipToNext, giveUp, wrongAnswers, isCorrect, gameOver, userGuess, setUserGuess, handleGuess, isFullPlaying, playFullSong, stopFullSong, startNewSong }) {
  return (
    <>
      <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, background: "#555", padding: "6px 10px", borderRadius: 8 }}>⬅ Wróć</button>
      <h2 style={{ marginBottom: 10, color: "#ccc" }}>{title}</h2>
      <h3>Fragment: <strong>{LEVELS[snippetIndex].label}</strong></h3>
      <p>⏱ {displayedTime.toFixed(1)}s / {LEVELS[snippetIndex].displayTime}s</p>
      <audio ref={audioRef} src={currentSong.snippet} />
      
      {!isCorrect && !gameOver && (
        <>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: 35 }}>
            {!isPlaying ? 
              <button onClick={playSnippet} style={{ background: "#333", padding: "10px 25px", borderRadius: 10 }}>▶️ Play</button> : 
              <button onClick={stopSnippet} style={{ background: "#333", padding: "10px 25px", borderRadius: 10 }}>⏹ Stop</button>
            }
            <button onClick={skipToNext} style={{ background: "#333", padding: "10px 25px", borderRadius: 10 }}>⏭ Skip</button>
          </div>

          <div className="search-section">
            <SearchBar onSelectSong={(title, artist) => setUserGuess(`${title} - ${artist}`)} />
            <button 
              onClick={handleGuess} 
              style={{ background: "#4caf50", color: "white", padding: "16px 0", borderRadius: 14, border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "1.2rem", width: "100%", marginTop: 5 }}
            >
              Submit
            </button>
          </div>

          <div style={{ marginTop: 25 }}>
            {wrongAnswers.map((ans, i) => (
              <div key={i} style={{ marginTop: 8, borderRadius: 8, padding: "8px 15px", border: "1px solid #444", backgroundColor: ans.artistCorrect ? "#ffd54f" : "#ef5350", color: "black", display: "inline-block", minWidth: "250px" }}>
                ❌ {ans.title}
              </div>
            ))}
          </div>
          
          {snippetIndex === LEVELS.length - 1 && (
            <div style={{ marginTop: 20 }}>
              <button onClick={giveUp} style={{ background: "#ff5555", color: "white", padding: "8px 15px", borderRadius: 8 }}>Give Up</button>
            </div>
          )}
        </>
      )}

      {(isCorrect || gameOver) && (
        <div style={{ marginTop: 16 }}>
          {isCorrect ? <h2>✅ Correct!</h2> : <h2 style={{ color: "#ff5555" }}>❌ Nie udało się</h2>}
          <p style={{ fontSize: "1.2rem" }}><strong>Tytuł:</strong> {currentSong.title}<br /><strong>Artysta:</strong> {currentSong.artist}</p>
          {currentSong.cover && <img src={currentSong.cover} alt="cover" width={220} style={{ borderRadius: 15, marginTop: 15, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />}
          <div style={{ marginTop: 20 }}>
            {isFullPlaying ? 
              <button onClick={stopFullSong} style={{ background: "#444", padding: "10px 20px", borderRadius: 10 }}>⏹ Stop Full</button> : 
              <button onClick={playFullSong} style={{ background: "#444", padding: "10px 20px", borderRadius: 10 }}>▶️ Play Full</button>
            }
          </div>
          <button onClick={() => startNewSong()} style={{ marginTop: 20, background: "#fff", color: "#000", padding: "12px 30px", borderRadius: 10, fontWeight: "bold" }}>Next →</button>
        </div>
      )}
    </>
  );
}